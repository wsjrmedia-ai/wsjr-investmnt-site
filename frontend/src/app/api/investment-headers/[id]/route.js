import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Investment Header ID is required' }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabase.from('approach_headers').update({
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
    }).eq('id', id).select().single();

    if (error || !data) {
       console.error('Supabase error updating investment header:', error);
       return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error updating investment header:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Investment Header ID is required' }, { status: 400 });

    const { error } = await supabase.from('approach_headers').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting investment header:', error);
       return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting investment header:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
