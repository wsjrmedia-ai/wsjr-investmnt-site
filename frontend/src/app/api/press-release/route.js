import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function GET() {
  try {
    const { data: news, error } = await supabase.from('news_releases')
      .select('*').order('published_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching news releases:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    // Format mapKeys { image_link: 'imageLink', published_at: 'date' }
    const formattedData = news.map(item => ({
      ...item,
      imageLink: item.image_link,
      date: item.published_at
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Server error fetching news releases:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const link = formData.get('link');
    const file = formData.get('image');

    if (!title || !description || !date || !file || !link || file.size === 0) {
      return NextResponse.json({ message: 'Title, description, date, link and image are required' }, { status: 400 });
    }

    const imageUrl = await uploadToStorage(file, 'misc-uploads');
    if (!imageUrl) return NextResponse.json({ message: 'Failed to upload image' }, { status: 400 });

    const { data: news, error } = await supabase.from('news_releases').insert({
      title,
      description,
      published_at: date,
      image_link: imageUrl,
      link,
      is_active: true,
    }).select().single();

    if (error) {
      console.error('Supabase error inserting news release:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    const formattedNews = {
      ...news,
      imageLink: news.image_link,
      date: news.published_at
    };

    return NextResponse.json({ message: 'News Release added successfully', news: formattedNews }, { status: 201 });
  } catch (error) {
    console.error('Server error adding news release:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}