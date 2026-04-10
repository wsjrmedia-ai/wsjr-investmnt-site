import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Testimonials change whenever the admin adds/edits/deletes one in the
// Dashboard — we must never cache them at the edge or in the browser,
// otherwise changes take up to 5 minutes to appear on the live site
// (next.config.mjs applies a default Cache-Control: max-age=300 to /api/*).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Explicit Cache-Control headers on every response override the global
// /api/* header rule from next.config.mjs.
const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET() {
  try {
    // Public site only ever sees testimonials the admin has flagged as active.
    // Ordered by the explicit display order set in the Dashboard.
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Supabase error fetching testimonials:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: NO_CACHE_HEADERS },
      );
    }
    return NextResponse.json(data, { status: 200, headers: NO_CACHE_HEADERS });
  } catch (error) {
    console.error('Server error fetching testimonials:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: NO_CACHE_HEADERS },
    );
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
