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
};

// Seed initial realistic data matching reference (Image 3) if empty
const INITIAL_LEADS: Lead[] = [
    {
        id: 'DEPWEB0030',
        code: 'DEPWEB0030',
        number: 30,
        type: 'consultation',
        name: 'Fatma Sheikh',
        phone: '+919811503024',
        email: 'fatma.sheikh@example.com',
        petType: 'Cat',
        category: 'Diagnostic & Lab Tests',
        service: 'Complete Blood Health Check',
        price: '4999',
        city: 'Delhi NCR',
        pincode: '110001',
        date: '2026-11-18',
        timeSlot: 'Morning (10 AM - 1 PM)',
        message: 'Cat has been sluggish for 2 days. Need blood panel.',
        source: 'Hero Section Form',
        status: 'Completed',
        timestamp: '18/11/2026, 14:22:10',
    },
    {
        id: 'DEPWEB0029',
        code: 'DEPWEB0029',
        number: 29,
        type: 'consultation',
        name: 'Rohan Sharma',
        phone: '+919871234567',
        email: 'rohan.s@gmail.com',
        petType: 'Dog',
        category: 'Preventive Wellness',
        service: 'Full Body Health Exam',
        price: '1499',
        city: 'Gurgaon',
        pincode: '122002',
        date: '2026-11-18',
        timeSlot: 'Evening (4 PM - 7 PM)',
        message: 'Annual vaccination & puppy checkup needed.',
        source: 'Hero Section Form',
        status: 'Pending',
        timestamp: '18/11/2026, 11:45:00',
    },
    {
        id: 'DEPWEB0028',
        code: 'DEPWEB0028',
        number: 28,
        type: 'consultation',
        name: 'Priya Mehra',
        phone: '+919810987654',
        email: 'priyamehra@yahoo.com',
        petType: 'Dog',
        category: 'Grooming Services',
        service: 'Complete Spa & Hygiene Grooming',
        price: '2199',
        city: 'Noida',
        pincode: '201301',
        date: '2026-11-17',
        timeSlot: 'Morning (10 AM - 1 PM)',
        message: 'Golden retriever de-shedding bath.',
        source: 'Grooming Page',
        status: 'Pending',
        timestamp: '17/11/2026, 16:30:15',
    },
    {
        id: 'DEPWEB0027',
        code: 'DEPWEB0027',
        number: 27,
        type: 'contact',
        name: 'Amitabh Sen',
        phone: '+919820123456',
        email: 'amitabh.sen@rediffmail.com',
        petType: 'Dog',
        category: 'General Enquiry',
        service: 'General Query',
        price: '0',
        city: 'South Delhi',
        pincode: '110017',
        message: 'Do you provide emergency vet assistance after 9 PM in Hauz Khas?',
        source: 'Contact Page Form',
        status: 'Completed',
        timestamp: '16/11/2026, 19:10:45',
    },
    {
        id: 'DEPWEB0026',
        code: 'DEPWEB0026',
        number: 26,
        type: 'consultation',
        name: 'Kavita Verma',
        phone: '+919911223344',
        email: 'kavita.v@outlook.com',
        petType: 'Cat',
        category: 'Vaccination',
        service: 'Feline Trio Core Vaccine',
        price: '1800',
        city: 'Ghaziabad',
        pincode: '201012',
        date: '2026-11-16',
        message: 'Kitten first year booster shots.',
        source: 'Vaccination Page',
        status: 'Cancelled',
        timestamp: '16/11/2026, 09:15:30',
    }
];

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
        return INITIAL_LEADS;
    }
}

export async function saveLeads(leads: Lead[]): Promise<void> {
    await ensureDataFiles();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function addLead(newLeadData: Omit<Lead, 'id' | 'code' | 'number' | 'timestamp' | 'status'> & { status?: Lead['status'] }): Promise<Lead> {
    const leads = await getLeads();

    // Determine the next sequential number starting from 1 or current max
    const maxNumber = leads.reduce((max, lead) => Math.max(max, lead.number || 0), 0);
    const nextNumber = maxNumber > 0 ? maxNumber + 1 : 1;

    // Unique ID format requested: DEPWEB00<N> (e.g. DEPWEB001, DEPWEB002 ... DEPWEB0031)
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

    leads.unshift(lead); // Put newest first
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

