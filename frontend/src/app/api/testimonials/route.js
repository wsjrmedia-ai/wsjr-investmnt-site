import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('testimonials').select('*').order('order_index');
    if (error) {
      console.error('Supabase error fetching testimonials:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching testimonials:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('testimonials').insert({
      name: body.name,
      designation: body.designation,
      company: body.company,
      content: body.content,
      rating: body.rating,
      img_link: body.imgLink || body.img_link,
      is_active: body.isActive !== undefined ? body.isActive : true,
      order_index: body.orderIndex || 0,
    }).select().single();

    if (error) {
       console.error('Supabase error creating testimonial:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Testimonial created', data }, { status: 201 });
  } catch (error) {
    console.error('Server error creating testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
