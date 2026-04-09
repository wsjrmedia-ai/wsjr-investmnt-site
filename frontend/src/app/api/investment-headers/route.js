import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('approach_headers').select('*');
    if (error) {
       console.error('Supabase error fetching investment headers:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching investment headers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('approach_headers').insert({
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
    }).select().single();

    if (error) {
       console.error('Supabase error creating investment header:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating investment header:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
