import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: items, error } = await supabase
      .from('news_items')
      .select('*')
      .eq('visible', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching visible news previews:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const response = items.map(item => {
      const dynamicTags = [];
      if (item.is_pro_content) dynamicTags.push('popular');
      if (item.is_blog) dynamicTags.push('blog');
      if (item.is_live) dynamicTags.push('live');
      if (item.is_club_content) dynamicTags.push('club');

      return {
        id: item.id,
        title: item.title,
        categorytype: item.category,
        date: new Date(item.published_at).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'long', year: 'numeric',
        }),
        writer: 'wallstreetjr',
        category: item.tags,
        image: item.image_url || '/blogs/blog1.png',
        description: item.description,
        tags: [...new Set(dynamicTags)],
        redirectPath: item.redirect_path,
      };
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Server error fetching visible news previews:', error);
    return NextResponse.json({ error: 'Failed to fetch visible news' }, { status: 500 });
  }
}
