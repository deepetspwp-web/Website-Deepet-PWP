import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Neon's HTTP driver: each query is a single HTTPS request, with no TCP/TLS/auth
// handshake per cold start (the old pg Pool took ~3-4s to connect on a cold function).
export interface QueryResult<T> {
    rows: T[];
    rowCount: number | null;
}

let sql: NeonQueryFunction<false, true> | null = null;

function getSql(): NeonQueryFunction<false, true> {
    if (!sql) {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error('DATABASE_URL is not set');
        sql = neon(url, { fullResults: true });
    }
    return sql;
}

async function runQuery<T = any>(text: string, params: any[] = []): Promise<QueryResult<T>> {
    const res = await getSql().query(text, params);
    return { rows: res.rows as T[], rowCount: res.rowCount };
}

export async function query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    try {
        return await runQuery<T>(text, params);
    } catch (err: any) {
        // 42P01 = table does not exist: create the tables once, then retry.
        if (err?.code === '42P01' && !tablesInitialized) {
            await createTables();
            return runQuery<T>(text, params);
        }
        throw err;
    }
}

let tablesInitialized = false;

async function createTables(): Promise<void> {
    if (tablesInitialized) return;

    try {
        await runQuery(`
            CREATE TABLE IF NOT EXISTS leads (
                id VARCHAR(64) PRIMARY KEY,
                code VARCHAR(64) UNIQUE NOT NULL,
                number INT NOT NULL,
                type VARCHAR(32) NOT NULL DEFAULT 'consultation',
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(64) NOT NULL,
                email VARCHAR(255),
                pet_type VARCHAR(64),
                category VARCHAR(255),
                service VARCHAR(255),
                price VARCHAR(64),
                city VARCHAR(255),
                pincode VARCHAR(32),
                date VARCHAR(64),
                time_slot VARCHAR(64),
                message TEXT,
                source VARCHAR(255),
                status VARCHAR(32) NOT NULL DEFAULT 'Pending',
                timestamp VARCHAR(64) NOT NULL,
                utm_source VARCHAR(255),
                utm_medium VARCHAR(255),
                utm_campaign VARCHAR(255),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await runQuery(`
            CREATE TABLE IF NOT EXISTS admin_settings (
                id VARCHAR(32) PRIMARY KEY DEFAULT 'default',
                notification_recipient_email VARCHAR(255) DEFAULT 'deepetservices1@gmail.com',
                sender_display_name VARCHAR(255) DEFAULT 'DeePets Notifications',
                sender_email VARCHAR(255) DEFAULT 'contact@deepetservices.com',
                enable_email_notifications BOOLEAN DEFAULT TRUE,
                google_script_webhook_url TEXT DEFAULT '',
                admin_username VARCHAR(255) DEFAULT '1',
                admin_password VARCHAR(255) DEFAULT '1',
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        tablesInitialized = true;
    } catch (err) {
        console.error('Failed to ensure database tables:', err);
    }
}

// Tables are created on demand by query() if they are missing, so no extra
// round trips are spent on CREATE TABLE IF NOT EXISTS before each request.
export async function ensureTables(): Promise<void> {}
