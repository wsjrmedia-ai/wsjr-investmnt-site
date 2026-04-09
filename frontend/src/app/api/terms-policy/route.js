import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('policy_and_terms').select('*');
    if (error) {
       console.error('Supabase error fetching policy and terms:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching policy and terms:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const type = body.type || 'privacy_policy';
    const { data: existing } = await supabase.from('policy_and_terms')
      .select('id').eq('type', type).maybeSingle();

    const payload = {
      type,
      title: body.title,
      content: body.content,
      version: body.version,
      effective_date: body.effectiveDate || body.effective_date,
      is_active: body.isActive !== undefined ? body.isActive : true,
    };

    if (existing) {
      const { data, error } = await supabase.from('policy_and_terms')
        .update(payload).eq('id', existing.id).select().single();
      if (error) {
         console.error('Supabase error updating policy and terms:', error);
         return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }

    const { data, error } = await supabase.from('policy_and_terms').insert(payload).select().single();
    if (error) {
       console.error('Supabase error creating policy and terms:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating policy and terms:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
