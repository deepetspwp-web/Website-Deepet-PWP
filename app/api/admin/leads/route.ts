import { NextResponse } from 'next/server';
import { getLeads, updateLeadStatus, deleteLead, addLead } from '@/lib/leadsStore';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type') || 'all'; // 'consultation' | 'contact' | 'all'
        const status = searchParams.get('status'); // 'Pending' | 'Completed' | 'Cancelled'
        const search = (searchParams.get('q') || '').toLowerCase();

        let leads = await getLeads();

        // Calculate overall stats
        const stats = {
            total: leads.length,
            active: leads.filter(l => l.status === 'Pending').length,
            completed: leads.filter(l => l.status === 'Completed').length,
            cancelled: leads.filter(l => l.status === 'Cancelled').length,
            consultations: leads.filter(l => l.type === 'consultation').length,
            contacts: leads.filter(l => l.type === 'contact').length,
        };

        if (type !== 'all') {
            leads = leads.filter(l => l.type === type);
        }

        if (status && status !== 'all') {
            if (status.toLowerCase() === 'active') {
                leads = leads.filter(l => l.status === 'Pending');
            } else {
                leads = leads.filter(l => l.status.toLowerCase() === status.toLowerCase());
            }
        }

        if (search) {
            leads = leads.filter(l =>
                l.code.toLowerCase().includes(search) ||
                l.name.toLowerCase().includes(search) ||
                l.phone.toLowerCase().includes(search) ||
                (l.service && l.service.toLowerCase().includes(search)) ||
                (l.city && l.city.toLowerCase().includes(search))
            );
        }

        return NextResponse.json({
            success: true,
            leads,
            stats,
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        const updated = await updateLeadStatus(id, status);
        if (!updated) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, lead: updated });
    } catch (error) {
        console.error('Error updating lead status:', error);
        return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
        }

        const success = await deleteLead(id);
        return NextResponse.json({ success });
    } catch (error) {
        console.error('Error deleting lead:', error);
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}

