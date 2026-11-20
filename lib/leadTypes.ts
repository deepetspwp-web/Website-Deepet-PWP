// Shared between the server (leadsStore) and the admin panel (client).

export interface Lead {
    id: string;
    code: string;
    number: number;
    type: "consultation" | "contact";
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
    status: "Pending" | "Completed" | "Cancelled";
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
}
