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

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'News item ID is required' }, { status: 400 });

    const { data: newsItem, error } = await supabase
      .from('news_items').select('*').eq('id', id).single();

    if (error || !newsItem) {
      console.error('Supabase error fetching news item:', error);
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(newsItem, { status: 200 });
  } catch (error) {
    console.error('Server error fetching news item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'News item ID is required' }, { status: 400 });

    const body = await request.json();
    let { imageUrl, ...rest } = body;

    if (imageUrl && imageUrl.startsWith('data:image')) {
      imageUrl = await uploadToStorage(imageUrl, 'news-images');
    }

    const redirectPath = await generateUniqueSlug(rest.title);

    const { data: updatedNewsItem, error } = await supabase
      .from('news_items')
      .update({
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
        published_at: rest.publishedAt,
        is_blog: rest.isBlog,
        is_live: rest.isLive,
        is_pro_content: rest.isProContent,
        is_club_content: rest.isClubContent,
        visible: rest.visible,
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !updatedNewsItem) {
      console.error('Supabase error updating news item:', error);
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedNewsItem, { status: 200 });
  } catch (error) {
    console.error('Server error updating news item:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'News item ID is required' }, { status: 400 });

    const { error } = await supabase.from('news_items').delete().eq('id', id);
    if (error) {
      console.error('Supabase error deleting news item:', error);
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting news item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
