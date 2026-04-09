import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('company_overview').select('*');
    if (error) {
       console.error('Supabase error fetching company overview:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching company overview:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: existing } = await supabase.from('company_overview').select('id').limit(1).maybeSingle();

    const payload = {
      section: body.section || 'main',
      title: body.title,
      content: body.content,
      img_link: body.imgLink || body.img_link,
    };

    if (existing) {
      const { data, error } = await supabase.from('company_overview')
        .update(payload).eq('id', existing.id).select().single();
      if (error) {
         console.error('Supabase error updating company overview:', error);
         return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }

    const { data, error } = await supabase.from('company_overview').insert(payload).select().single();
    if (error) {
       console.error('Supabase error creating company overview:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating company overview:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
