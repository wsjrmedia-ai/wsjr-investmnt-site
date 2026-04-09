import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('why_choose_us').select('*').order('order_index');
    if (error) {
       console.error('Supabase error fetching why choose us items:', error);
       return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching why choose us items:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('why_choose_us').insert({
      title: body.title,
      description: body.description,
      icon: body.icon,
      order_index: body.orderIndex || body.order_index || 0,
      is_active: body.isActive !== undefined ? body.isActive : true,
    }).select().single();

    if (error) {
       console.error('Supabase error creating why choose us item:', error);
       return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating why choose us item:', error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
