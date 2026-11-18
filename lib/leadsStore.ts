import fs from 'fs/promises';
import path from 'path';

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

// No dummy data - starts fresh
const INITIAL_LEADS: Lead[] = [];

async function ensureDataFiles(): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch {
        // ignore
    }

    try {
        await fs.access(LEADS_FILE);
    } catch {
        await fs.writeFile(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
    }

    try {
        await fs.access(SETTINGS_FILE);
    } catch {
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
    }
}

export async function getLeads(): Promise<Lead[]> {
    await ensureDataFiles();
    try {
        const raw = await fs.readFile(LEADS_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Error reading leads file:', err);
        return [];
    }
}

export async function saveLeads(leads: Lead[]): Promise<void> {
    await ensureDataFiles();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function addLead(newLeadData: Omit<Lead, 'id' | 'code' | 'number' | 'timestamp' | 'status'> & { status?: Lead['status'] }): Promise<Lead> {
    const leads = await getLeads();

    // Determine the next sequential number starting from 1
    const maxNumber = leads.reduce((max, lead) => Math.max(max, lead.number || 0), 0);
    const nextNumber = maxNumber > 0 ? maxNumber + 1 : 1;

    // Unique ID format: DEPWEB00<N> (e.g. DEPWEB001, DEPWEB002...)
    const code = `DEPWEB00${nextNumber}`;

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

    const lead: Lead = {
        id: code,
        code,
        number: nextNumber,
        status: newLeadData.status || 'Pending',
        timestamp: formattedTimestamp,
        ...newLeadData,
    };

    leads.unshift(lead); // Prepend so latest appears first
    await saveLeads(leads);
    return lead;
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
    const leads = await getLeads();
    const index = leads.findIndex(l => l.id === id || l.code === id);
    if (index === -1) return null;

    leads[index].status = status;
    await saveLeads(leads);
    return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
    const leads = await getLeads();
    const filtered = leads.filter(l => l.id !== id && l.code !== id);
    if (filtered.length === leads.length) return false;

    await saveLeads(filtered);
    return true;
}

export async function getSettings(): Promise<AdminSettings> {
    await ensureDataFiles();
    try {
        const raw = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export async function saveSettings(newSettings: Partial<AdminSettings>): Promise<AdminSettings> {
    await ensureDataFiles();
    const current = await getSettings();
    const updated = { ...current, ...newSettings };
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
}
