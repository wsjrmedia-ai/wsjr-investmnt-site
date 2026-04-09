import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('testimonial_meta').select('*').limit(1).single();
    if (error || !data) {
       console.error('Supabase error fetching testimonial meta:', error);
       return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching testimonial meta:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: existing } = await supabase.from('testimonial_meta').select('id').limit(1).single();

    if (existing) {
      const { data, error } = await supabase.from('testimonial_meta')
        .update({ title: body.title, subtitle: body.subtitle })
        .eq('id', existing.id).select().single();

      if (error) {
         console.error('Supabase error updating testimonial meta:', error);
         return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Meta updated', data }, { status: 200 });
    }

    const { data, error } = await supabase.from('testimonial_meta')
      .insert({ title: body.title, subtitle: body.subtitle }).select().single();
      
    if (error) {
       console.error('Supabase error creating testimonial meta:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Meta created', data }, { status: 201 });
  } catch (error) {
    console.error('Server error posting testimonial meta:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
