import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const { error } = await supabase.from('company_overview').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting company overview:', error);
       return NextResponse.json({ message: 'Company overview not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Company overview deleted' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting company overview:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
