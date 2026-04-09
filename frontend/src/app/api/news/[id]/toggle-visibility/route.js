import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'News item ID is required' }, { status: 400 });

    const { data: existing, error: fetchErr } = await supabase
      .from('news_items').select('visible').eq('id', id).single();

    if (fetchErr || !existing) {
      console.error('Supabase error fetching news item for visibility toggle:', fetchErr);
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    const { data: newsItem, error } = await supabase
      .from('news_items')
      .update({ visible: !existing.visible })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error toggling visibility:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newsItem, { status: 200 });
  } catch (error) {
    console.error('Server error toggling visibility:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
