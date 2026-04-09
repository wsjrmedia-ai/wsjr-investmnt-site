import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const { error } = await supabase.from('policy_and_terms').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting policy and terms:', error);
       return NextResponse.json({ message: 'Policy not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Policy deleted' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting policy and terms:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
