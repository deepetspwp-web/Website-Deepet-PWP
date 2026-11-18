import fs from 'fs/promises';
import path from 'path';
import { query, ensureTables } from './db';

export interface Lead {
    id: string;
    code: string;
    number: number;
    type: 'consultation' | 'contact';
    name: string;
    phone: string;
    email?: string;
    petType?: string;
    category?: string;
    service?: string;
    price?: string | number;
    city?: string;
    pincode?: string;
    date?: string;
    timeSlot?: string;
    message?: string;
    source: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
    timestamp: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
}

export interface AdminSettings {
    notificationRecipientEmail: string;
    senderDisplayName: string;
    senderEmail: string;
    enableEmailNotifications: boolean;
    googleScriptWebhookUrl: string;
    adminUsername?: string;
    adminPassword?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

const DEFAULT_SETTINGS: AdminSettings = {
    notificationRecipientEmail: 'deepetservices1@gmail.com',
    senderDisplayName: 'DeePets Notifications',
    senderEmail: 'contact@deepetservices.com',
    enableEmailNotifications: true,
    googleScriptWebhookUrl: '',
    adminUsername: '1',
    adminPassword: '1',
};

// -------------------------------------------------------------
// LOCAL FALLBACK HELPERS
// -------------------------------------------------------------
async function getLocalLeads(): Promise<Lead[]> {
    try {
        const raw = await fs.readFile(LEADS_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

async function saveLocalLeads(leads: Lead[]): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    } catch {
        // ignore
    }
}

async function getLocalSettings(): Promise<AdminSettings> {
    try {
        const raw = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

async function saveLocalSettings(settings: AdminSettings): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
    } catch {
        // ignore
    }
}

// -------------------------------------------------------------
// MAIN DATABASE EXPORTS (NEON POSTGRESQL)
// -------------------------------------------------------------

export async function getLeads(): Promise<Lead[]> {
    try {
        await ensureTables();
        const res = await query(`
            SELECT 
                id, code, number, type, name, phone, email,
                pet_type as "petType", category, service, price, city, pincode,
                date, time_slot as "timeSlot", message, source, status,
                timestamp, utm_source, utm_medium, utm_campaign
            FROM leads
            ORDER BY number DESC
        `);
        return res.rows;
    } catch (dbErr) {
        console.error('Neon DB read error, using local fallback:', dbErr);
        return getLocalLeads();
    }
}

export async function addLead(
    newLeadData: Omit<Lead, 'id' | 'code' | 'number' | 'timestamp' | 'status'> & { status?: Lead['status'] }
): Promise<Lead> {
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const status = newLeadData.status || 'Pending';

    try {
        await ensureTables();

        // Get max sequential number from DB
        const maxRes = await query(`SELECT COALESCE(MAX(number), 0) as max_num FROM leads`);
        const maxNumber = parseInt(maxRes.rows[0]?.max_num || '0', 10);
        const nextNumber = maxNumber > 0 ? maxNumber + 1 : 1;
        const code = `DEPWEB00${nextNumber}`;

        await query(
            `
            INSERT INTO leads (
                id, code, number, type, name, phone, email, pet_type, category, service,
                price, city, pincode, date, time_slot, message, source, status, timestamp,
                utm_source, utm_medium, utm_campaign
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22
            )
            `,
            [
                code,
                code,
                nextNumber,
                newLeadData.type,
                newLeadData.name,
                newLeadData.phone,
                newLeadData.email || '',
                newLeadData.petType || 'Dog',
                newLeadData.category || '',
                newLeadData.service || '',
                String(newLeadData.price || '0'),
                newLeadData.city || '',
                newLeadData.pincode || '',
                newLeadData.date || '',
                newLeadData.timeSlot || '',
                newLeadData.message || '',
                newLeadData.source || 'Website Form',
                status,
                formattedTimestamp,
                newLeadData.utm_source || '',
                newLeadData.utm_medium || '',
                newLeadData.utm_campaign || '',
            ]
        );

        const lead: Lead = {
            id: code,
            code,
            number: nextNumber,
            status,
            timestamp: formattedTimestamp,
            ...newLeadData,
        };

        // Also save to local backup
        getLocalLeads().then((localList) => {
            localList.unshift(lead);
            saveLocalLeads(localList);
        });

        return lead;
    } catch (dbErr) {
        console.error('Neon DB insert error, using local fallback:', dbErr);
        const localList = await getLocalLeads();
        const maxNumber = localList.reduce((max, l) => Math.max(max, l.number || 0), 0);
        const nextNumber = maxNumber > 0 ? maxNumber + 1 : 1;
        const code = `DEPWEB00${nextNumber}`;

        const lead: Lead = {
            id: code,
            code,
            number: nextNumber,
            status,
            timestamp: formattedTimestamp,
            ...newLeadData,
        };
        localList.unshift(lead);
        await saveLocalLeads(localList);
        return lead;
    }
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
    try {
        await ensureTables();
        const res = await query(
            `
            UPDATE leads
            SET status = $1
            WHERE id = $2 OR code = $2
            RETURNING 
                id, code, number, type, name, phone, email,
                pet_type as "petType", category, service, price, city, pincode,
                date, time_slot as "timeSlot", message, source, status,
                timestamp, utm_source, utm_medium, utm_campaign
            `,
            [status, id]
        );

        if (res.rows.length > 0) {
            return res.rows[0];
        }
    } catch (err) {
        console.error('Neon DB status update error:', err);
    }

    // Local fallback update
    const localList = await getLocalLeads();
    const idx = localList.findIndex((l) => l.id === id || l.code === id);
    if (idx !== -1) {
        localList[idx].status = status;
        await saveLocalLeads(localList);
        return localList[idx];
    }
    return null;
}

export async function deleteLead(id: string): Promise<boolean> {
    try {
        await ensureTables();
        const res = await query(`DELETE FROM leads WHERE id = $1 OR code = $1`, [id]);
        return (res.rowCount || 0) > 0;
    } catch (err) {
        console.error('Neon DB delete error:', err);
    }

    const localList = await getLocalLeads();
    const filtered = localList.filter((l) => l.id !== id && l.code !== id);
    if (filtered.length !== localList.length) {
        await saveLocalLeads(filtered);
        return true;
    }
    return false;
}

export async function getSettings(): Promise<AdminSettings> {
    try {
        await ensureTables();
        const res = await query(`
            SELECT 
                notification_recipient_email as "notificationRecipientEmail",
                sender_display_name as "senderDisplayName",
                sender_email as "senderEmail",
                enable_email_notifications as "enableEmailNotifications",
                google_script_webhook_url as "googleScriptWebhookUrl",
                admin_username as "adminUsername",
                admin_password as "adminPassword"
            FROM admin_settings
            WHERE id = 'default'
        `);

        if (res.rows.length > 0) {
            return { ...DEFAULT_SETTINGS, ...res.rows[0] };
        }
    } catch (err) {
        console.error('Neon DB getSettings error:', err);
    }

    return getLocalSettings();
}

export async function saveSettings(newSettings: Partial<AdminSettings>): Promise<AdminSettings> {
    const current = await getSettings();
    const updated: AdminSettings = { ...current, ...newSettings };

    try {
        await ensureTables();
        await query(
            `
            INSERT INTO admin_settings (
                id, notification_recipient_email, sender_display_name, sender_email,
                enable_email_notifications, google_script_webhook_url, admin_username, admin_password,
                updated_at
            ) VALUES (
                'default', $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP
            )
            ON CONFLICT (id) DO UPDATE SET
                notification_recipient_email = EXCLUDED.notification_recipient_email,
                sender_display_name = EXCLUDED.sender_display_name,
                sender_email = EXCLUDED.sender_email,
                enable_email_notifications = EXCLUDED.enable_email_notifications,
                google_script_webhook_url = EXCLUDED.google_script_webhook_url,
                admin_username = EXCLUDED.admin_username,
                admin_password = EXCLUDED.admin_password,
                updated_at = CURRENT_TIMESTAMP
            `,
            [
                updated.notificationRecipientEmail,
                updated.senderDisplayName,
                updated.senderEmail,
                updated.enableEmailNotifications,
                updated.googleScriptWebhookUrl,
                updated.adminUsername || '1',
                updated.adminPassword || '1',
            ]
        );
    } catch (err) {
        console.error('Neon DB saveSettings error:', err);
    }

    await saveLocalSettings(updated);
    return updated;
}
