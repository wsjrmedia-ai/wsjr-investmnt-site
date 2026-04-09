import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const redirectPath = searchParams.get('redirectPath');

    if (!id && !redirectPath) {
      return NextResponse.json({ error: 'Either "id" or "redirectPath" query param is required.' }, { status: 400 });
    }

    let query = supabase.from('news_items').select('content, category, tags');

    if (id) {
      query = query.eq('id', id);
    } else {
      query = query.eq('redirect_path', redirectPath);
    }

    const { data: newsItem, error } = await query.single();

    if (error || !newsItem) {
      console.error('Supabase error fetching news content details:', error);
      return NextResponse.json({ error: 'News item not found.' }, { status: 404 });
    }

    return NextResponse.json(newsItem, { status: 200 });
  } catch (error) {
    console.error('Server error fetching news content: ', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
