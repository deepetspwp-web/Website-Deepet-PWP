'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    Search,
    RefreshCw,
    Download,
    MessageCircle,
    Phone,
    Mail,
    FileSpreadsheet,
    Copy,
    Check,
    Send,
    ExternalLink,
    Trash2,
    Calendar,
    MapPin,
    AlertCircle,
    SlidersHorizontal,
    CheckCircle2,
    Lock,
    Unlock,
    ShieldCheck,
    Clock,
    XCircle
} from 'lucide-react';
import { Lead, AdminSettings } from '@/lib/leadsStore';

const APPS_SCRIPT_CODE = `function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'DeePets Google Sheet Webhook is active and working!'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Check cell A1: ONLY add headers once if A1 is empty
    var firstCell = sheet.getRange(1, 1).getValue();
    if (!firstCell || firstCell.toString().trim() === "") {
      var headers = [
        "Consultation Code",
        "Customer Name",
        "Phone Number",
        "Pet Type",
        "Category",
        "Service / Package",
        "Price (₹)",
        "City",
        "Pincode",
        "Message / Preferred Date",
        "Submission Timestamp"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#003451")
        .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.code || data.bookingId || "",
      data.name || "",
      data.phone || "",
      data.petType || "",
      data.category || "",
      data.service || "",
      data.price || "",
      data.city || "",
      data.pincode || "",
      data.message || data.date || "",
      data.timestamp || new Date().toLocaleString()
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Row added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

export default function AdminDashboardPage() {
    // Navigation tabs: 'consultations' | 'contacts' | 'email' | 'sheets'
    const [activeTab, setActiveTab] = useState<'consultations' | 'contacts' | 'email' | 'sheets'>('consultations');

    // Leads & filter state
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        completed: 0,
        cancelled: 0,
        consultations: 0,
        contacts: 0,
    });
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Settings state
    const [settings, setSettings] = useState<AdminSettings>({
        notificationRecipientEmail: 'deepetservices1@gmail.com',
        senderDisplayName: 'DeePets Notifications',
        senderEmail: 'contact@deepetservices.com',
        enableEmailNotifications: true,
        googleScriptWebhookUrl: '',
    });
    const [settingsSaved, setSettingsSaved] = useState(false);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Test actions state
    const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
    const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
    const [testWebhookStatus, setTestWebhookStatus] = useState<string | null>(null);
    const [isSendingTestWebhook, setIsSendingTestWebhook] = useState(false);
    const [copiedScript, setCopiedScript] = useState(false);

    // Fetch leads and stats
    const fetchLeads = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/admin/leads');
            const data = await res.json();
            if (data.success) {
                setLeads(data.leads || []);
                setStats(data.stats || {
                    total: 0,
                    active: 0,
                    completed: 0,
                    cancelled: 0,
                    consultations: 0,
                    contacts: 0,
                });
            }
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    // Fetch settings
    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data.success && data.settings) {
                setSettings(data.settings);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };

    useEffect(() => {
        fetchLeads();
        fetchSettings();
    }, []);

    // Filter leads based on current tab, status pill, and search
    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            // Tab filter: consultations vs contacts
            if (activeTab === 'consultations' && lead.type === 'contact') return false;
            if (activeTab === 'contacts' && lead.type === 'consultation') return false;

            // Status filter
            if (statusFilter === 'active' && lead.status !== 'Pending') return false;
            if (statusFilter === 'completed' && lead.status !== 'Completed') return false;
            if (statusFilter === 'cancelled' && lead.status !== 'Cancelled') return false;

            // Search filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchCode = lead.code?.toLowerCase().includes(q);
                const matchName = lead.name?.toLowerCase().includes(q);
                const matchPhone = lead.phone?.toLowerCase().includes(q);
                const matchService = lead.service?.toLowerCase().includes(q);
                const matchCity = lead.city?.toLowerCase().includes(q);
                return matchCode || matchName || matchPhone || matchService || matchCity;
            }

            return true;
        });
    }, [leads, activeTab, statusFilter, searchQuery]);

    // Update lead status
    const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
        // Optimistic UI update
        setLeads((prev) =>
            prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );

        try {
            const res = await fetch('/api/admin/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: leadId, status: newStatus }),
            });
            if (!res.ok) {
                throw new Error('Failed to update status');
            }
            // Recalculate stats
            fetchLeads();
        } catch (error) {
            console.error(error);
            alert('Failed to update status on server. Reverting...');
            fetchLeads();
        }
    };

    // Delete lead
    const handleDeleteLead = async (leadId: string) => {
        if (!confirm(`Are you sure you want to delete lead ${leadId}?`)) return;

        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        try {
            await fetch(`/api/admin/leads?id=${leadId}`, { method: 'DELETE' });
            fetchLeads();
        } catch (error) {
            console.error('Delete error:', error);
            fetchLeads();
        }
    };

    // Save Email Settings
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingSettings(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            const data = await res.json();
            if (data.success) {
                setSettingsSaved(true);
                setTimeout(() => setSettingsSaved(false), 3000);
            }
        } catch (err) {
            console.error('Error saving settings:', err);
            alert('Failed to save settings.');
        } finally {
            setIsSavingSettings(false);
        }
    };

    // Send Test Email
    const handleSendTestEmail = async () => {
        setIsSendingTestEmail(true);
        setTestEmailStatus(null);
        try {
            const res = await fetch('/api/admin/test-email', { method: 'POST' });
            const data = await res.json();
            setTestEmailStatus(data.message || data.error || 'Test email completed');
        } catch (err) {
            setTestEmailStatus('Failed to send test email');
        } finally {
            setIsSendingTestEmail(false);
        }
    };

    // Send Test Webhook to Google Sheet
    const handleSendTestWebhook = async () => {
        setIsSendingTestWebhook(true);
        setTestWebhookStatus(null);
        try {
            const res = await fetch('/api/admin/test-webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ webhookUrl: settings.googleScriptWebhookUrl }),
            });
            const data = await res.json();
            if (data.success) {
                setTestWebhookStatus('Success: Test row added to your Google Sheet!');
            } else {
                setTestWebhookStatus(`Error: ${data.error}`);
            }
        } catch (err) {
            setTestWebhookStatus('Network error while testing webhook');
        } finally {
            setIsSendingTestWebhook(false);
        }
    };

    // Export CSV
    const exportCSV = () => {
        if (!leads.length) {
            alert('No leads to export');
            return;
        }

        const headers = [
            'Consultation Code',
            'Customer Name',
            'Phone Number',
            'Email',
            'Pet Type',
            'Category',
            'Service / Package',
            'Price (₹)',
            'City',
            'Pincode',
            'Status',
            'Source',
            'Preferred Date / Slot',
            'Message',
            'Submission Timestamp',
        ];

        const rows = leads.map((l) => [
            `"${l.code || ''}"`,
            `"${(l.name || '').replace(/"/g, '""')}"`,
            `"${l.phone || ''}"`,
            `"${l.email || ''}"`,
            `"${l.petType || ''}"`,
            `"${(l.category || '').replace(/"/g, '""')}"`,
            `"${(l.service || '').replace(/"/g, '""')}"`,
            `"${l.price || ''}"`,
            `"${l.city || ''}"`,
            `"${l.pincode || ''}"`,
            `"${l.status || ''}"`,
            `"${l.source || ''}"`,
            `"${[l.date, l.timeSlot].filter(Boolean).join(' ') || ''}"`,
            `"${(l.message || '').replace(/"/g, '""')}"`,
            `"${l.timestamp || ''}"`,
        ]);

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `DeePets_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Copy Google Apps Script code
    const copyAppsScript = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(APPS_SCRIPT_CODE);
            setCopiedScript(true);
            setTimeout(() => setCopiedScript(false), 2500);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans pb-16">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#003451] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                🐾
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-serif font-bold text-lg text-[#003451] tracking-tight">
                                        DeePets
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md bg-[#bfe37f]/30 text-[#003451] text-[10px] font-bold uppercase tracking-wider">
                                        Admin
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium">Lead Management &amp; Settings</p>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                            <button
                                type="button"
                                onClick={() => setActiveTab('consultations')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'consultations'
                                        ? 'bg-white text-[#003451] shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Consultations ({stats.consultations})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('contacts')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'contacts'
                                        ? 'bg-white text-[#003451] shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Contact Enquiries ({stats.contacts})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('email')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'email'
                                        ? 'bg-white text-[#003451] shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Email Settings
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('sheets')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === 'sheets'
                                        ? 'bg-white text-[#003451] shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Google Sheet
                            </button>
                        </nav>

                        {/* Right Quick Links */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                <span>Live Site</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Tabs */}
                    <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-100 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setActiveTab('consultations')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                                activeTab === 'consultations' ? 'bg-[#003451] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Consultations
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('contacts')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                                activeTab === 'contacts' ? 'bg-[#003451] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Contacts
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('email')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                                activeTab === 'email' ? 'bg-[#003451] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('sheets')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                                activeTab === 'sheets' ? 'bg-[#003451] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Google Sheet
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* =========================================================================
                    TAB 1 & 2: CONSULTATIONS & CONTACT LEADS (REFERENCE IMAGE 3)
                   ========================================================================= */}
                {(activeTab === 'consultations' || activeTab === 'contacts') && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003451] tracking-tight">
                                    {activeTab === 'consultations'
                                        ? 'Consultation Requests & Leads'
                                        : 'Contact Form Enquiries'}
                                </h1>
                                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                    {activeTab === 'consultations'
                                        ? 'All pet parent consultation inquiries, callback requests, and bookings from the hero and service forms.'
                                        : 'All general questions and customer inquiries submitted through contact forms across the website.'}
                                </p>
                            </div>

                            {/* Top Right Action Buttons */}
                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    onClick={fetchLeads}
                                    disabled={isRefreshing}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#95c93d] hover:bg-[#86b834] text-[#003451] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    <span>Sync DB</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={exportCSV}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    <Download className="w-4 h-4 text-slate-600" />
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* 4 Metrics Summary Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Total Card */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {activeTab === 'consultations' ? 'Total Consultations' : 'Total Enquiries'}
                                </span>
                                <p className="text-3xl font-extrabold text-[#003451] mt-2 tracking-tight">
                                    {activeTab === 'consultations' ? stats.consultations : stats.contacts}
                                </p>
                            </div>

                            {/* Active / Pending Card */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                                    Active / Pending
                                </span>
                                <p className="text-3xl font-extrabold text-[#f97316] mt-2 tracking-tight">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Pending').length}
                                </p>
                            </div>

                            {/* Completed Card */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                    Completed
                                </span>
                                <p className="text-3xl font-extrabold text-[#10b981] mt-2 tracking-tight">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Completed').length}
                                </p>
                            </div>

                            {/* Cancelled Card */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                                    Cancelled
                                </span>
                                <p className="text-3xl font-extrabold text-[#ef4444] mt-2 tracking-tight">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Cancelled').length}
                                </p>
                            </div>
                        </div>

                        {/* Search and Filter Row */}
                        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search name, phone, code..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#95c93d]/50 focus:bg-white transition-all"
                                />
                            </div>

                            {/* Filter Pills */}
                            <div className="flex items-center gap-1.5 self-start md:self-auto overflow-x-auto w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('all')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        statusFilter === 'all'
                                            ? 'bg-[#95c93d] text-[#003451] shadow-xs'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('active')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        statusFilter === 'active'
                                            ? 'bg-[#003451] text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Active
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('completed')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        statusFilter === 'completed'
                                            ? 'bg-[#003451] text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Completed
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('cancelled')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        statusFilter === 'cancelled'
                                            ? 'bg-[#003451] text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Cancelled
                                </button>
                            </div>
                        </div>

                        {/* Leads Data Table (Reference Image 3) */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                                        <tr>
                                            <th className="py-3.5 px-4 sm:px-6">CODE / DATE</th>
                                            <th className="py-3.5 px-4 sm:px-6">PET PARENT</th>
                                            <th className="py-3.5 px-4 sm:px-6">PET &amp; SERVICE</th>
                                            <th className="py-3.5 px-4 sm:px-6">STATUS</th>
                                            <th className="py-3.5 px-4 sm:px-6 text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-slate-400">
                                                    Loading leads database...
                                                </td>
                                            </tr>
                                        ) : filteredLeads.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-slate-400">
                                                    No leads matching your current criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredLeads.map((lead) => {
                                                const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                                                const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(
                                                    `Hi ${lead.name || 'there'}! This is DeePet Services regarding your consultation booking (${lead.code}). How can we assist you today?`
                                                )}`;

                                                return (
                                                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                                                        {/* Code & Date */}
                                                        <td className="py-4 px-4 sm:px-6 align-top">
                                                            <div className="font-mono font-bold text-[#65a30d] text-sm">
                                                                {lead.code}
                                                            </div>
                                                            <div className="text-[11px] text-slate-400 mt-0.5">
                                                                {lead.timestamp?.split(',')[0] || lead.date || 'Recent'}
                                                            </div>
                                                            <span className="inline-block mt-1 text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                                {lead.source}
                                                            </span>
                                                        </td>

                                                        {/* Pet Parent */}
                                                        <td className="py-4 px-4 sm:px-6 align-top">
                                                            <div className="font-bold text-[#003451] text-sm sm:text-base">
                                                                {lead.name}
                                                            </div>
                                                            <a
                                                                href={`tel:${lead.phone}`}
                                                                className="text-xs text-slate-600 hover:text-[#003451] font-medium block mt-0.5 hover:underline"
                                                            >
                                                                {lead.phone}
                                                            </a>
                                                            {(lead.city || lead.pincode) && (
                                                                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                                                                    <MapPin className="w-3 h-3 text-slate-400" />
                                                                    <span>{lead.city} {lead.pincode ? `(${lead.pincode})` : ''}</span>
                                                                </div>
                                                            )}
                                                            {lead.message && (
                                                                <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded mt-1.5 border border-slate-100 line-clamp-2 max-w-xs">
                                                                    &ldquo;{lead.message}&rdquo;
                                                                </p>
                                                            )}
                                                        </td>

                                                        {/* Pet & Service */}
                                                        <td className="py-4 px-4 sm:px-6 align-top">
                                                            {lead.petType && (
                                                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 mb-1.5">
                                                                    {lead.petType}
                                                                </span>
                                                            )}
                                                            <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                                                                {lead.service || 'In-Home Vet Visit'}
                                                            </div>
                                                            {lead.category && (
                                                                <div className="text-[11px] text-slate-500 mt-0.5">
                                                                    {lead.category} {lead.price ? `• ₹${lead.price}` : ''}
                                                                </div>
                                                            )}
                                                            {lead.date && (
                                                                <div className="text-[11px] text-[#003451] font-medium flex items-center gap-1 mt-1">
                                                                    <Calendar className="w-3 h-3 text-[#95c93d]" />
                                                                    <span>{lead.date} {lead.timeSlot ? `(${lead.timeSlot})` : ''}</span>
                                                                </div>
                                                            )}
                                                        </td>

                                                        {/* Status Dropdown */}
                                                        <td className="py-4 px-4 sm:px-6 align-top">
                                                            <select
                                                                value={lead.status}
                                                                onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                                                                className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-all ${
                                                                    lead.status === 'Completed'
                                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                                                        : lead.status === 'Pending'
                                                                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                                                                        : 'bg-rose-50 text-rose-700 border-rose-300'
                                                                }`}
                                                            >
                                                                <option value="Pending">Active / Pending</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                            </select>
                                                        </td>

                                                        {/* Actions: WhatsApp & Call */}
                                                        <td className="py-4 px-4 sm:px-6 align-top text-right">
                                                            <div className="inline-flex items-center gap-1.5">
                                                                <a
                                                                    href={waUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    title="Chat on WhatsApp"
                                                                    className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-600 flex items-center justify-center transition-all"
                                                                >
                                                                    <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
                                                                </a>
                                                                <a
                                                                    href={`tel:${lead.phone}`}
                                                                    title="Call Customer"
                                                                    className="w-8 h-8 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-sky-600 flex items-center justify-center transition-all"
                                                                >
                                                                    <Phone className="w-4 h-4" />
                                                                </a>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteLead(lead.id)}
                                                                    title="Delete Entry"
                                                                    className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-300 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    TAB 3: EMAIL NOTIFICATION SETTINGS (REFERENCE IMAGE 2)
                   ========================================================================= */}
                {activeTab === 'email' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003451] tracking-tight">
                                Email Notification Settings
                            </h1>
                            <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                Configure the email address where all consultation requests and lead bookings will be delivered.
                            </p>
                        </div>

                        {/* Settings Card */}
                        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                            {/* Recipient Email Address */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    NOTIFICATION RECIPIENT EMAIL ADDRESS
                                </label>
                                <p className="text-xs text-slate-400">
                                    All consultation inquiries and lead bookings submitted by pet parents will be sent to this email address. You can update this email anytime.
                                </p>
                                <input
                                    type="email"
                                    required
                                    value={settings.notificationRecipientEmail}
                                    onChange={(e) => setSettings({ ...settings, notificationRecipientEmail: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#95c93d] focus:border-transparent transition-all"
                                    placeholder="e.g. deepetservices1@gmail.com"
                                />
                            </div>

                            {/* Sender Display Name */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    SENDER DISPLAY NAME
                                </label>
                                <input
                                    type="text"
                                    value={settings.senderDisplayName}
                                    onChange={(e) => setSettings({ ...settings, senderDisplayName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#95c93d] focus:border-transparent transition-all"
                                    placeholder="DeePets Notifications"
                                />
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="enable_notifications"
                                    checked={settings.enableEmailNotifications}
                                    onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                                    className="w-4 h-4 rounded text-[#95c93d] focus:ring-[#95c93d] cursor-pointer"
                                />
                                <label htmlFor="enable_notifications" className="text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                                    Enable email notifications for new consultation bookings
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    disabled={isSavingSettings}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#95c93d] hover:bg-[#86b834] text-[#003451] font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    {settingsSaved ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Settings Saved!</span>
                                        </>
                                    ) : (
                                        <span>Save Email Settings</span>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSendTestEmail}
                                    disabled={isSendingTestEmail}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#003451] hover:bg-[#00263b] text-white font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    <Send className={`w-4 h-4 ${isSendingTestEmail ? 'animate-pulse' : ''}`} />
                                    <span>{isSendingTestEmail ? 'Sending...' : 'Send Test Email Now'}</span>
                                </button>
                            </div>

                            {testEmailStatus && (
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#95c93d]" />
                                    <span>{testEmailStatus}</span>
                                </div>
                            )}
                        </form>

                        {/* Active Email Delivery Setup Callout Card (Reference Image 2) */}
                        <div className="bg-[#0b1a28] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                <Mail className="w-4 h-4" />
                                <span>Active Email Delivery Setup</span>
                            </div>

                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-mono">
                                <li className="flex items-center gap-2">
                                    <span className="text-slate-500">•</span>
                                    <span>Sender Email: <strong className="text-white">{settings.senderEmail || 'contact@deepetservices.com'}</strong></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-slate-500">•</span>
                                    <span>Active Recipient Email: <strong className="text-white">{settings.notificationRecipientEmail || 'deepetservices1@gmail.com'}</strong></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-slate-500">•</span>
                                    <span>Delivery Engine: <strong className="text-white">Resend API / SMTP (Verified Domain)</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    TAB 4: GOOGLE SHEET INTEGRATION (REFERENCE IMAGE 4 & 5)
                   ========================================================================= */}
                {activeTab === 'sheets' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003451] tracking-tight">
                                    Google Sheet Integration
                                </h1>
                            </div>
                            <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                Connect your Google Sheet via Apps Script Webhook to automatically receive all incoming consultation leads in real-time with proper table headers.
                            </p>
                        </div>

                        {/* Webhook URL Input Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    GOOGLE APPS SCRIPT WEBHOOK URL
                                </label>
                                <p className="text-xs text-slate-400">
                                    Paste your deployed Google Apps Script Web App URL below (e.g., https://script.google.com/macros/s/.../exec).
                                </p>
                                <input
                                    type="url"
                                    value={settings.googleScriptWebhookUrl}
                                    onChange={(e) => setSettings({ ...settings, googleScriptWebhookUrl: e.target.value })}
                                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#95c93d] focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleSaveSettings}
                                    disabled={isSavingSettings}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#95c93d] hover:bg-[#86b834] text-[#003451] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    {settingsSaved ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Saved!</span>
                                        </>
                                    ) : (
                                        <span>Save Webhook URL</span>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSendTestWebhook}
                                    disabled={isSendingTestWebhook || !settings.googleScriptWebhookUrl}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#003451] hover:bg-[#00263b] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                                >
                                    <Send className={`w-4 h-4 ${isSendingTestWebhook ? 'animate-pulse' : ''}`} />
                                    <span>{isSendingTestWebhook ? 'Testing...' : 'Send Test Lead to Google Sheet'}</span>
                                </button>
                            </div>

                            {testWebhookStatus && (
                                <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                                    testWebhookStatus.startsWith('Success')
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}>
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{testWebhookStatus}</span>
                                </div>
                            )}
                        </div>

                        {/* Step-by-Step Instructions Card (Reference Image 4) */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#003451] font-bold text-base sm:text-lg">
                                    <span>✨ Step-by-Step Google Sheet Setup Instructions</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={copyAppsScript}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003451] hover:bg-[#00263b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
                                >
                                    {copiedScript ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-[#bfe37f]" />
                                            <span>Copied Script!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy Apps Script Code</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <ol className="space-y-4 text-xs sm:text-sm text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                    </span>
                                    <div>
                                        <strong>Create a Google Sheet:</strong> Open{' '}
                                        <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#003451] font-bold underline">
                                            sheets.new
                                        </a>{' '}
                                        (or use your existing sheet). If the sheet is brand new or missing headers, the script below will automatically create, format, and freeze the header row for you!
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                    </span>
                                    <div>
                                        <strong>Open Script Editor:</strong> In your Google Sheet, click{' '}
                                        <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">
                                            Extensions → Apps Script
                                        </code>{' '}
                                        from the top navigation menu.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                        3
                                    </span>
                                    <div className="w-full">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <strong>Paste Apps Script Code:</strong> Erase everything inside{' '}
                                                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">
                                                    Code.gs
                                                </code>{' '}
                                                and paste this exact script:
                                            </div>
                                            <button
                                                type="button"
                                                onClick={copyAppsScript}
                                                className="text-xs text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                                            >
                                                <Copy className="w-3 h-3" />
                                                <span>Copy Code</span>
                                            </button>
                                        </div>

                                        {/* Code Viewer Container */}
                                        <div className="bg-[#0b1a28] rounded-2xl p-4 sm:p-5 text-slate-200 font-mono text-xs overflow-x-auto max-h-80 border border-slate-800 shadow-inner">
                                            <pre><code>{APPS_SCRIPT_CODE}</code></pre>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
                                        4
                                    </span>
                                    <div>
                                        <strong>Deploy as Web App:</strong> In Apps Script, click{' '}
                                        <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">
                                            Deploy → New deployment
                                        </code>
                                        . Select type{' '}
                                        <strong>Web app</strong>, set <em>Execute as:</em> <strong>Me</strong>, and set <em>Who has access:</em> <strong>Anyone</strong>. Click <strong>Deploy</strong> and copy the generated Web App URL into the input field above!
                                    </div>
                                </li>
                            </ol>
                        </div>

                        {/* Column Structure & Headings Reference (Reference Image 5) */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                                <h2 className="text-base sm:text-lg font-bold text-[#003451]">
                                    Google Sheet Column Structure &amp; Headings Reference
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500">
                                When leads are submitted, each piece of data is placed into the designated column as mapped below:
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead className="bg-[#0b1a28] text-white font-bold text-xs">
                                        <tr>
                                            <th className="py-3 px-4 w-16">Col</th>
                                            <th className="py-3 px-4">Header Name</th>
                                            <th className="py-3 px-4">Data Field</th>
                                            <th className="py-3 px-4">Example Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">A</td>
                                            <td className="py-3 px-4 font-bold">Consultation Code</td>
                                            <td className="py-3 px-4 text-slate-500">Unique ID</td>
                                            <td className="py-3 px-4 font-mono text-[#65a30d] font-bold">DEPWEB0030</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">B</td>
                                            <td className="py-3 px-4 font-bold">Customer Name</td>
                                            <td className="py-3 px-4 text-slate-500">Name</td>
                                            <td className="py-3 px-4">Adnan Ali</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">C</td>
                                            <td className="py-3 px-4 font-bold">Phone Number</td>
                                            <td className="py-3 px-4 text-slate-500">Contact Number</td>
                                            <td className="py-3 px-4 font-mono">+91 9889989899</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">D</td>
                                            <td className="py-3 px-4 font-bold">Pet Type</td>
                                            <td className="py-3 px-4 text-slate-500">Dog / Cat</td>
                                            <td className="py-3 px-4">Dog</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">E</td>
                                            <td className="py-3 px-4 font-bold">Category</td>
                                            <td className="py-3 px-4 text-slate-500">Service Category</td>
                                            <td className="py-3 px-4">Preventive Wellness</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">F</td>
                                            <td className="py-3 px-4 font-bold">Service / Package</td>
                                            <td className="py-3 px-4 text-slate-500">Selected Package / Test</td>
                                            <td className="py-3 px-4">Wellness 360° — Adult Pet</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">G</td>
                                            <td className="py-3 px-4 font-bold">Price (₹)</td>
                                            <td className="py-3 px-4 text-slate-500">Package Cost</td>
                                            <td className="py-3 px-4 font-mono">4999</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">H</td>
                                            <td className="py-3 px-4 font-bold">City</td>
                                            <td className="py-3 px-4 text-slate-500">Location</td>
                                            <td className="py-3 px-4">Delhi NCR</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">I</td>
                                            <td className="py-3 px-4 font-bold">Pincode</td>
                                            <td className="py-3 px-4 text-slate-500">Postal Code</td>
                                            <td className="py-3 px-4 font-mono">110001</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">J</td>
                                            <td className="py-3 px-4 font-bold">Message / Preferred Date</td>
                                            <td className="py-3 px-4 text-slate-500">Notes / Schedule</td>
                                            <td className="py-3 px-4">Preferred date: 2026-11-05</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="py-3 px-4 font-bold text-[#003451]">K</td>
                                            <td className="py-3 px-4 font-bold">Submission Timestamp</td>
                                            <td className="py-3 px-4 text-slate-500">Date &amp; Time</td>
                                            <td className="py-3 px-4 font-mono text-xs">19/11/2026, 12:44:50</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
