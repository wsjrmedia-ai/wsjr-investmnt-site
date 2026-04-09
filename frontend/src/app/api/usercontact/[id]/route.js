import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });

    const { data, error } = await supabase.from('user_contacts').select('*').eq('id', id).single();
    
    if (error || !data) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching contact:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });

    const body = await request.json();
    const { name, email, phone, description } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('user_contacts').update({
      name, email, phone, message: description,
    }).eq('id', id).select().single();

    if (error || !data) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact updated successfully', userContact: data }, { status: 200 });
  } catch (error) {
    console.error('Server error updating contact:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });

    const { error } = await supabase.from('user_contacts').delete().eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting contact:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
