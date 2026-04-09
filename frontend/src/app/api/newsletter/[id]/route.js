import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Subscriber ID is required' }, { status: 400 });

    const { error } = await supabase.from('newsletters').delete().eq('id', id);

    if (error) {
      console.error('Supabase error deleting subscriber:', error);
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subscriber deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting subscriber:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
