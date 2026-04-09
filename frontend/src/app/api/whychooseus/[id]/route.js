import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabase.from('why_choose_us').update({
      title: body.title,
      description: body.description,
      icon: body.icon,
      order_index: body.orderIndex || body.order_index,
      is_active: body.isActive,
    }).eq('id', id).select().single();

    if (error || !data) {
       console.error('Supabase error updating why choose us item:', error);
       return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error updating why choose us item:', error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    const { error } = await supabase.from('why_choose_us').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting why choose us item:', error);
       return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting why choose us item:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
