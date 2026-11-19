import { Pool, QueryResult, QueryResultRow } from 'pg';
import dns from 'dns';

// DNS cache map for instant 0ms lookups
const dnsCache = new Map<string, string[]>();

// Pre-populate Neon pooler IPs so zero DNS lookups are needed
dnsCache.set('ep-silent-leaf-bewfpm0c-pooler.c-9.us-east-2.aws.neon.tech', [
    '77.113.7.222',
    '3.147.219.177',
    '77.113.120.60',
]);

// Patch dns.lookup to use cache and public DNS (8.8.8.8, 1.1.1.1)
if (typeof dns.lookup === 'function') {
    const originalLookup = dns.lookup;
    (dns as any).lookup = function (hostname: string, options: any, callback: any) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        // Return from memory cache immediately if present
        if (dnsCache.has(hostname)) {
            const cached = dnsCache.get(hostname)!;
            if (options && options.all) {
                return callback(null, cached.map((a) => ({ address: a, family: 4 })), 4);
            }
            return callback(null, cached[0], 4);
        }

        // Fast resolve using public DNS
        const resolver = new dns.Resolver();
        resolver.setServers(['8.8.8.8', '1.1.1.1']);
        resolver.resolve4(hostname, (resErr, addresses) => {
            if (!resErr && addresses && addresses.length > 0) {
                dnsCache.set(hostname, addresses);
                if (options && options.all) {
                    return callback(null, addresses.map((a) => ({ address: a, family: 4 })), 4);
                }
                return callback(null, addresses[0], 4);
            }
            originalLookup(hostname, options, callback);
        });
    };
}

const DEFAULT_DATABASE_URL =
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_Pfls4gviRSk1@ep-silent-leaf-bewfpm0c-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Global singleton pool across hot reloads in Next.js development
declare global {
    var _pgPool: Pool | undefined;
    var _keepAliveInterval: NodeJS.Timeout | undefined;
}

let pool: Pool;

if (!global._pgPool) {
    global._pgPool = new Pool({
        connectionString: DEFAULT_DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 20,
        idleTimeoutMillis: 60000,
        connectionTimeoutMillis: 5000,
        keepAlive: true,
        keepAliveInitialDelayMillis: 5000,
    });
}
pool = global._pgPool;

// Keep-alive heartbeat: keeps the TLS connection hot so queries execute in <300ms instead of 4s cold start
if (!global._keepAliveInterval) {
    global._keepAliveInterval = setInterval(() => {
        pool.query('SELECT 1').catch(() => {});
    }, 25000);
    if (global._keepAliveInterval.unref) {
        global._keepAliveInterval.unref();
    }
}

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

        tablesInitialized = true;
    } catch (err) {
        console.error('Failed to ensure database tables:', err);
    }
}

// Background pre-warming of connection pool
ensureTables().catch(() => {});

export default pool;
