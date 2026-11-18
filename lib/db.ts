import { Pool, QueryResult, QueryResultRow } from 'pg';
import dns from 'dns';

// DNS patch for environments where local ISP resolvers do not resolve AWS Neon pooler CNAMEs
if (typeof dns.lookup === 'function') {
    const originalLookup = dns.lookup;
    (dns as any).lookup = function (hostname: string, options: any, callback: any) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        originalLookup(hostname, options, (err, address, family) => {
            if (!err && address) {
                return callback(null, address, family);
            }
            // Fallback to public DNS (Google 8.8.8.8 & Cloudflare 1.1.1.1)
            const resolver = new dns.Resolver();
            resolver.setServers(['8.8.8.8', '1.1.1.1']);
            resolver.resolve4(hostname, (resErr, addresses) => {
                if (!resErr && addresses && addresses.length > 0) {
                    if (options && options.all) {
                        return callback(null, addresses.map((a) => ({ address: a, family: 4 })), 4);
                    }
                    return callback(null, addresses[0], 4);
                }
                callback(err || resErr, address, family);
            });
        });
    };
}

const DEFAULT_DATABASE_URL =
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_Pfls4gviRSk1@ep-silent-leaf-bewfpm0c-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Global singleton pool across hot reloads in Next.js development
declare global {
    var _pgPool: Pool | undefined;
}

let pool: Pool;

if (!global._pgPool) {
    global._pgPool = new Pool({
        connectionString: DEFAULT_DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    });
}
pool = global._pgPool;

export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<QueryResult<T>> {
    return pool.query<T>(text, params);
}

let tablesInitialized = false;

export async function ensureTables(): Promise<void> {
    if (tablesInitialized) return;

    try {
        await query(`
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

        await query(`
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

        await query(`
            INSERT INTO admin_settings (id, notification_recipient_email, sender_display_name, sender_email, enable_email_notifications, google_script_webhook_url, admin_username, admin_password)
            VALUES ('default', 'deepetservices1@gmail.com', 'DeePets Notifications', 'contact@deepetservices.com', TRUE, '', '1', '1')
            ON CONFLICT (id) DO NOTHING;
        `);

        tablesInitialized = true;
    } catch (err) {
        console.error('Failed to ensure database tables:', err);
    }
}

export default pool;
