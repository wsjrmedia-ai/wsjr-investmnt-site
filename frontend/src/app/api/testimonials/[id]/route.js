import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });

    const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
    if (error || !data) {
       console.error('Supabase error fetching testimonial by ID:', error);
       return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching testimonial by ID:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabase.from('testimonials').update({
      name: body.name,
      designation: body.designation,
      company: body.company,
      content: body.content,
      rating: body.rating,
      img_link: body.imgLink || body.img_link,
      is_active: body.isActive,
      order_index: body.orderIndex,
    }).eq('id', id).select().single();

    if (error || !data) {
       console.error('Supabase error updating testimonial:', error);
       return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Updated', data }, { status: 200 });
  } catch (error) {
    console.error('Server error updating testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });

    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting testimonial:', error);
       return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
