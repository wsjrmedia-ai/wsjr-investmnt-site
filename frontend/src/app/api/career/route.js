import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('career_page').select('*').limit(1).maybeSingle();
    if (error) {
       console.error('Supabase error fetching career page:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) return NextResponse.json({ message: 'Career page not found' }, { status: 404 });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching career page:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: existing } = await supabase.from('career_page').select('id').limit(1).maybeSingle();

    const payload = {
      title: body.title,
      description: body.description,
      img_link: body.imgLink || body.img_link,
    };

    if (existing) {
      const { data, error } = await supabase.from('career_page')
        .update(payload).eq('id', existing.id).select().single();
      if (error) {
         console.error('Supabase error updating career page:', error);
         return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }

    const { data, error } = await supabase.from('career_page').insert(payload).select().single();
    if (error) {
       console.error('Supabase error creating career page:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating/updating career page:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
