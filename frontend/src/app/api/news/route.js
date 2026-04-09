import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

const slugify = (text) =>
  text.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const generateUniqueSlug = async (title) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const { data } = await supabase
      .from('news_items').select('id').eq('redirect_path', slug).maybeSingle();
    if (!data) break;
    slug = `${baseSlug}-(${counter++})`;
  }

  return slug;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const marketImpact = searchParams.get('marketImpact');
    const isBlog = searchParams.get('isBlog');
    const isLive = searchParams.get('isLive');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');

    let query = supabase.from('news_items').select('*');

    if (category) query = query.eq('category', category);
    if (marketImpact) query = query.eq('market_impact', marketImpact);
    if (isBlog !== null) query = query.eq('is_blog', isBlog === 'true');
    if (isLive !== null) query = query.eq('is_live', isLive === 'true');
    if (search) query = query.textSearch('title', search);

    if (sortBy === 'oldest') {
      query = query.order('published_at', { ascending: true });
    } else if (sortBy === 'category') {
      query = query.order('category', { ascending: true });
    } else {
      query = query.order('published_at', { ascending: false });
    }

    const { data: newsItems, error } = await query;
    if (error) {
      console.error('Supabase error fetching news:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newsItems, { status: 200 });
  } catch (error) {
    console.error('Server error fetching news:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    let { imageUrl, ...rest } = body;

    if (imageUrl && imageUrl.startsWith('data:image')) {
      imageUrl = await uploadToStorage(imageUrl, 'news-images');
    }

    const redirectPath = await generateUniqueSlug(rest.title);

    const { data: newsItem, error } = await supabase
      .from('news_items')
      .insert({
        title: rest.title,
        description: rest.description,
        content: rest.content,
        redirect_path: redirectPath,
        category: rest.category,
        image_url: imageUrl,
        link: rest.link,
        source: rest.source,
        livestream_link: rest.livestreamLink,
        tags: rest.tags || [],
        market_impact: rest.marketImpact || 'None',
        published_at: rest.publishedAt || new Date().toISOString(),
        is_blog: rest.isBlog || false,
        is_live: rest.isLive || false,
        is_pro_content: rest.isProContent || false,
        is_club_content: rest.isClubContent || false,
        visible: rest.visible !== undefined ? rest.visible : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating news:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    console.error('Server error creating news:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
