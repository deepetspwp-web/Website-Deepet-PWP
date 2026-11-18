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
    Lock,
    KeyRound,
    User,
    LogOut,
    CheckCircle2,
    AlertCircle,
    Settings as SettingsIcon,
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
    // Auth state (Default credentials: 1 / 1)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authChecking, setAuthChecking] = useState<boolean>(true);
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordChangeStatus, setPasswordChangeStatus] = useState<string | null>(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Navigation tabs: 'consultations' | 'contacts' | 'email' | 'sheets' | 'security'
    const [activeTab, setActiveTab] = useState<'consultations' | 'contacts' | 'email' | 'sheets' | 'security'>('consultations');

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
        adminUsername: '1',
        adminPassword: '1',
    });
    const [settingsSaved, setSettingsSaved] = useState(false);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Test actions state
    const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
    const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
    const [testWebhookStatus, setTestWebhookStatus] = useState<string | null>(null);
    const [isSendingTestWebhook, setIsSendingTestWebhook] = useState(false);
    const [copiedScript, setCopiedScript] = useState(false);

    // Check existing session
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedIn = sessionStorage.getItem('deepet_admin_auth');
            if (loggedIn === 'true') {
                setIsAuthenticated(true);
            }
            setAuthChecking(false);
        }
    }, []);

    // Login Handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'login',
                    username: loginUser.trim(),
                    password: loginPass.trim(),
                }),
            });
            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                sessionStorage.setItem('deepet_admin_auth', 'true');
                fetchLeads();
                fetchSettings();
            } else {
                setLoginError(data.error || 'Incorrect username or password');
            }
        } catch {
            setLoginError('Connection error. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Logout Handler
    const handleLogout = () => {
        sessionStorage.removeItem('deepet_admin_auth');
        setIsAuthenticated(false);
        setLoginUser('');
        setLoginPass('');
    };

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
                setNewUsername(data.settings.adminUsername || '1');
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchLeads();
            fetchSettings();
        }
    }, [isAuthenticated]);

    // Filter leads
    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            if (activeTab === 'consultations' && lead.type === 'contact') return false;
            if (activeTab === 'contacts' && lead.type === 'consultation') return false;

            if (statusFilter === 'active' && lead.status !== 'Pending') return false;
            if (statusFilter === 'completed' && lead.status !== 'Completed') return false;
            if (statusFilter === 'cancelled' && lead.status !== 'Cancelled') return false;

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

    // Update status
    const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
        setLeads((prev) =>
            prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );

        try {
            await fetch('/api/admin/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: leadId, status: newStatus }),
            });
            fetchLeads();
        } catch {
            alert('Failed to update status on server.');
            fetchLeads();
        }
    };

    // Save Settings
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

    // Change Password Handler
    const handleChangeCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChangingPassword(true);
        setPasswordChangeStatus(null);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'change_credentials',
                    currentPassword: currentPassword.trim(),
                    newUsername: newUsername.trim(),
                    newPassword: newPassword.trim(),
                }),
            });
            const data = await res.json();

            if (data.success) {
                setPasswordChangeStatus('Success: Credentials updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                fetchSettings();
            } else {
                setPasswordChangeStatus(`Error: ${data.error}`);
            }
        } catch {
            setPasswordChangeStatus('Network error while updating credentials.');
        } finally {
            setIsChangingPassword(false);
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
        } catch {
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
                setTestWebhookStatus('Success: Test lead sent to your Google Sheet!');
            } else {
                setTestWebhookStatus(`Error: ${data.error}`);
            }
        } catch {
            setTestWebhookStatus('Network error while testing webhook');
        } finally {
            setIsSendingTestWebhook(false);
        }
    };

    // Export CSV
    const exportCSV = () => {
        if (!leads.length) {
            alert('No leads to export.');
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

    // Copy Apps Script
    const copyAppsScript = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(APPS_SCRIPT_CODE);
            setCopiedScript(true);
            setTimeout(() => setCopiedScript(false), 2500);
        }
    };

    // 1. Loading Splash
    if (authChecking) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
                <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
                    <span>Loading DeePets Admin...</span>
                </div>
            </div>
        );
    }

    // 2. Simple, Clean Login Screen (Credentials: 1 / 1)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans antialiased text-slate-800">
                <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
                            🐾
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            DeePets Admin
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Sign in to access leads and settings
                        </p>
                    </div>

                    {loginError && (
                        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{loginError}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    required
                                    value={loginUser}
                                    onChange={(e) => setLoginUser(e.target.value)}
                                    placeholder="Enter username (default: 1)"
                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={loginPass}
                                    onChange={(e) => setLoginPass(e.target.value)}
                                    placeholder="Enter password (default: 1)"
                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer active:scale-[0.99] disabled:bg-slate-400"
                        >
                            {isLoggingIn ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                        <p className="text-[11px] text-slate-400">
                            Default ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">1</code> / Password: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">1</code>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Main Clean Admin Dashboard
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased text-sm">
            {/* Clean Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        {/* Brand */}
                        <div className="flex items-center gap-2.5">
                            <span className="font-bold text-base text-slate-900 tracking-tight">
                                DeePets
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                Admin
                            </span>
                        </div>

                        {/* Minimalist Tabs */}
                        <nav className="hidden md:flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => setActiveTab('consultations')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                    activeTab === 'consultations'
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                Consultations ({stats.consultations})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('contacts')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                    activeTab === 'contacts'
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                Contacts ({stats.contacts})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('email')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                    activeTab === 'email'
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                Email Settings
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('sheets')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                    activeTab === 'sheets'
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                Google Sheet
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('security')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                    activeTab === 'security'
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                Change Password
                            </button>
                        </nav>

                        {/* Right Quick Actions */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <span>Website</span>
                                <ExternalLink className="w-3 h-3" />
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                title="Sign Out"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:text-rose-700 rounded border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3 h-3" />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Horizontal Tabs */}
                    <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setActiveTab('consultations')}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                activeTab === 'consultations' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Consultations ({stats.consultations})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('contacts')}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                activeTab === 'contacts' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Contacts
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('email')}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                activeTab === 'email' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('sheets')}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                activeTab === 'sheets' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Google Sheet
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('security')}
                            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                                activeTab === 'security' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                            Password
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

                {/* =========================================================================
                    TAB 1 & 2: LEADS TABLE (1-LINE CLEAN LAYOUT, NO DELETE BUTTON)
                   ========================================================================= */}
                {(activeTab === 'consultations' || activeTab === 'contacts') && (
                    <div className="space-y-4">
                        {/* Header Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">
                                    {activeTab === 'consultations' ? 'Consultation Bookings' : 'Contact Inquiries'}
                                </h1>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {activeTab === 'consultations'
                                        ? 'Incoming leads captured from the homepage hero and service forms in real-time.'
                                        : 'Customer questions submitted via contact and footer forms.'}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={fetchLeads}
                                    disabled={isRefreshing}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-slate-500' : ''}`} />
                                    <span>Refresh</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={exportCSV}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* 4 Stats Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Total
                                </div>
                                <div className="text-2xl font-bold text-slate-900 mt-1">
                                    {activeTab === 'consultations' ? stats.consultations : stats.contacts}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                                    Active / Pending
                                </div>
                                <div className="text-2xl font-bold text-amber-600 mt-1">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Pending').length}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                                    Completed
                                </div>
                                <div className="text-2xl font-bold text-emerald-600 mt-1">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Completed').length}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                                    Cancelled
                                </div>
                                <div className="text-2xl font-bold text-rose-600 mt-1">
                                    {leads.filter(l => (activeTab === 'consultations' ? l.type === 'consultation' : l.type === 'contact') && l.status === 'Cancelled').length}
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                            <div className="relative w-full sm:w-80">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search name, phone, code..."
                                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
                                />
                            </div>

                            <div className="flex items-center gap-1 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('all')}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                                        statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('active')}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                                        statusFilter === 'active' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Active
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('completed')}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                                        statusFilter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Completed
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('cancelled')}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                                        statusFilter === 'cancelled' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Cancelled
                                </button>
                            </div>
                        </div>

                        {/* All-in-one-line Leads Table */}
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs whitespace-nowrap">
                                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                                        <tr>
                                            <th className="py-2.5 px-3">Booking Code</th>
                                            <th className="py-2.5 px-3">Date &amp; Time</th>
                                            <th className="py-2.5 px-3">Customer Name</th>
                                            <th className="py-2.5 px-3">Phone</th>
                                            <th className="py-2.5 px-3">Pet</th>
                                            <th className="py-2.5 px-3">Service</th>
                                            <th className="py-2.5 px-3">City / Area</th>
                                            <th className="py-2.5 px-3">Notes / Slot</th>
                                            <th className="py-2.5 px-3">Status</th>
                                            <th className="py-2.5 px-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={10} className="py-10 text-center text-slate-400">
                                                    Loading data...
                                                </td>
                                            </tr>
                                        ) : filteredLeads.length === 0 ? (
                                            <tr>
                                                <td colSpan={10} className="py-12 text-center text-slate-500">
                                                    <div className="max-w-xs mx-auto text-center">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
                                                            📋
                                                        </div>
                                                        <p className="font-semibold text-slate-700">No leads recorded yet</p>
                                                        <p className="text-[11px] text-slate-400 mt-1">
                                                            When customers submit the hero or booking form on your website, leads will appear here in real time.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredLeads.map((lead) => {
                                                const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                                                const waPhone = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;
                                                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                                                    `Hi ${lead.name || 'there'}! This is DeePet Services regarding your consultation booking (${lead.code}). How can we assist you today?`
                                                )}`;

                                                return (
                                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                                        {/* Code */}
                                                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                                                            {lead.code}
                                                        </td>

                                                        {/* Date */}
                                                        <td className="py-2.5 px-3 text-slate-500">
                                                            {lead.timestamp || lead.date || 'Recent'}
                                                        </td>

                                                        {/* Name */}
                                                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                                                            {lead.name}
                                                        </td>

                                                        {/* Phone */}
                                                        <td className="py-2.5 px-3">
                                                            <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline font-mono">
                                                                {lead.phone}
                                                            </a>
                                                        </td>

                                                        {/* Pet Type */}
                                                        <td className="py-2.5 px-3">
                                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                                                                {lead.petType || 'Pet'}
                                                            </span>
                                                        </td>

                                                        {/* Service */}
                                                        <td className="py-2.5 px-3 text-slate-800">
                                                            {lead.service || 'General Consultation'}
                                                        </td>

                                                        {/* City */}
                                                        <td className="py-2.5 px-3 text-slate-600">
                                                            {lead.city || 'Delhi NCR'} {lead.pincode ? `(${lead.pincode})` : ''}
                                                        </td>

                                                        {/* Notes / Date */}
                                                        <td className="py-2.5 px-3 text-slate-500 max-w-xs truncate" title={lead.message || lead.timeSlot || ''}>
                                                            {lead.date ? `${lead.date} ` : ''}{lead.timeSlot ? `[${lead.timeSlot}] ` : ''}{lead.message || '-'}
                                                        </td>

                                                        {/* Status Dropdown */}
                                                        <td className="py-2.5 px-3">
                                                            <select
                                                                value={lead.status}
                                                                onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                                                                className={`text-[11px] font-semibold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${
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

                                                        {/* Actions: ONLY WhatsApp and Phone Call (DELETE REMOVED) */}
                                                        <td className="py-2.5 px-3 text-right">
                                                            <div className="inline-flex items-center gap-1.5">
                                                                <a
                                                                    href={waUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    title="WhatsApp Chat"
                                                                    className="w-7 h-7 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors border border-emerald-200"
                                                                >
                                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                                </a>
                                                                <a
                                                                    href={`tel:${lead.phone}`}
                                                                    title="Call Customer"
                                                                    className="w-7 h-7 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors border border-blue-200"
                                                                >
                                                                    <Phone className="w-3.5 h-3.5" />
                                                                </a>
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
                    TAB 3: EMAIL NOTIFICATION SETTINGS (CLEAN SIMPLE LOOK)
                   ========================================================================= */}
                {activeTab === 'email' && (
                    <div className="max-w-2xl mx-auto space-y-5">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Email Notification Settings</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Set where new lead bookings and consultation notifications are delivered.
                            </p>
                        </div>

                        <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Notification Recipient Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={settings.notificationRecipientEmail}
                                    onChange={(e) => setSettings({ ...settings, notificationRecipientEmail: e.target.value })}
                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                    placeholder="e.g. deepetservices1@gmail.com"
                                />
                                <p className="text-[11px] text-slate-400 mt-1">
                                    All booking submissions by customers will be sent to this email.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Sender Display Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.senderDisplayName}
                                    onChange={(e) => setSettings({ ...settings, senderDisplayName: e.target.value })}
                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                    placeholder="DeePets Notifications"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="enable_notifications"
                                    checked={settings.enableEmailNotifications}
                                    onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
                                />
                                <label htmlFor="enable_notifications" className="text-xs font-medium text-slate-700 cursor-pointer">
                                    Enable email notifications for new bookings
                                </label>
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="submit"
                                    disabled={isSavingSettings}
                                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
                                >
                                    {settingsSaved ? 'Saved Successfully!' : 'Save Email Settings'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSendTestEmail}
                                    disabled={isSendingTestEmail}
                                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
                                >
                                    {isSendingTestEmail ? 'Sending...' : 'Send Test Email'}
                                </button>
                            </div>

                            {testEmailStatus && (
                                <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-slate-500" />
                                    <span>{testEmailStatus}</span>
                                </div>
                            )}
                        </form>

                        <div className="bg-slate-900 text-slate-200 p-5 rounded-lg text-xs space-y-2">
                            <div className="font-semibold text-white flex items-center gap-1.5">
                                <Mail className="w-4 h-4 text-emerald-400" />
                                <span>Active Sender Setup</span>
                            </div>
                            <p className="text-slate-400">
                                Sender: <strong className="text-white">{settings.senderEmail || 'contact@deepetservices.com'}</strong>
                            </p>
                            <p className="text-slate-400">
                                Recipient: <strong className="text-white">{settings.notificationRecipientEmail || 'deepetservices1@gmail.com'}</strong>
                            </p>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    TAB 4: GOOGLE SHEET INTEGRATION (CLEAN SIMPLE LOOK)
                   ========================================================================= */}
                {activeTab === 'sheets' && (
                    <div className="max-w-2xl mx-auto space-y-5">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Google Sheet Integration</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Automatically push incoming leads to your Google Sheet in real time.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Google Apps Script Webhook URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.googleScriptWebhookUrl}
                                    onChange={(e) => setSettings({ ...settings, googleScriptWebhookUrl: e.target.value })}
                                    placeholder="https://script.google.com/macros/s/.../exec"
                                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleSaveSettings}
                                    disabled={isSavingSettings}
                                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
                                >
                                    {settingsSaved ? 'Saved!' : 'Save Webhook URL'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSendTestWebhook}
                                    disabled={isSendingTestWebhook || !settings.googleScriptWebhookUrl}
                                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {isSendingTestWebhook ? 'Testing...' : 'Send Test Lead to Sheet'}
                                </button>
                            </div>

                            {testWebhookStatus && (
                                <div className={`p-3 rounded-md text-xs font-medium border ${
                                    testWebhookStatus.startsWith('Success')
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}>
                                    {testWebhookStatus}
                                </div>
                            )}
                        </div>

                        {/* Step by step guide */}
                        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-slate-900">Setup Instructions</h2>
                                <button
                                    type="button"
                                    onClick={copyAppsScript}
                                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                                >
                                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                                </button>
                            </div>

                            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
                                <li>Create a new spreadsheet at <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">sheets.new</a></li>
                                <li>In the Google Sheet menu, click <strong>Extensions → Apps Script</strong></li>
                                <li>Replace everything in <code>Code.gs</code> with the copied script code.</li>
                                <li>Click <strong>Deploy → New deployment</strong>, select <strong>Web app</strong>, set <em>Who has access</em> to <strong>Anyone</strong>, and copy the Web App URL here.</li>
                            </ol>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    TAB 5: CHANGE PASSWORD & CREDENTIALS
                   ========================================================================= */}
                {activeTab === 'security' && (
                    <div className="max-w-md mx-auto space-y-5">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Admin Credentials</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Update the login username and password for this admin panel.
                            </p>
                        </div>

                        <form onSubmit={handleChangeCredentials} className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password (default: 1)"
                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Admin Username
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="Username (default: 1)"
                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isChangingPassword}
                                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
                            >
                                {isChangingPassword ? 'Updating...' : 'Update Password'}
                            </button>

                            {passwordChangeStatus && (
                                <div className={`p-3 rounded-md text-xs font-medium border ${
                                    passwordChangeStatus.startsWith('Success')
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}>
                                    {passwordChangeStatus}
                                </div>
                            )}
                        </form>
                    </div>
                )}

            </main>
        </div>
    );
}
