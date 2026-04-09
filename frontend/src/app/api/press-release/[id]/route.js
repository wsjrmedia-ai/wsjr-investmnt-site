import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'News Release ID is required' }, { status: 400 });

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const link = formData.get('link');
    const file = formData.get('image');

    const { data: existing } = await supabase.from('news_releases').select('*').eq('id', id).single();
    if (!existing) return NextResponse.json({ message: 'News Release not found' }, { status: 404 });

    let imageUrl = existing.image_link;
    if (file && file.size > 0) {
      imageUrl = await uploadToStorage(file, 'misc-uploads');
      if (!imageUrl) return NextResponse.json({ message: 'Failed to upload new image' }, { status: 400 });
    }

    const { data: news, error } = await supabase.from('news_releases').update({
      title: title || existing.title,
      description: description || existing.description,
      published_at: date || existing.published_at,
      image_link: imageUrl,
      link: link || existing.link,
    }).eq('id', id).select().single();

    if (error) {
       console.error('Supabase error updating news release:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    const formattedNews = {
      ...news,
      imageLink: news.image_link,
      date: news.published_at
    };

    return NextResponse.json({ message: 'News Release updated successfully', news: formattedNews }, { status: 200 });
  } catch (error) {
    console.error('Server error updating news release:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'News Release ID is required' }, { status: 400 });

    const { error } = await supabase.from('news_releases').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting news release:', error);
       return NextResponse.json({ message: 'News Release not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News Release deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting news release:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
