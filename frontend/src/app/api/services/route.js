import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function GET() {
  try {
    const { data, error } = await supabase.from('investment_approaches').select('*').order('order_index');
    if (error) {
       console.error('Supabase error fetching investment approaches:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedData = data.map(item => ({
      ...item,
      ImgLink: item.img_link,
      summary: item.description
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Server error fetching investment approaches:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const summary = formData.get('summary');
    const detailedDescription = formData.get('detailedDescription'); // not used in table, skipped
    const imageFile = formData.get('ImgLink');

    if (!title || !summary || !imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: 'Title, summary, and image are required' }, { status: 400 });
    }

    const imgLink = await uploadToStorage(imageFile, 'service-images');
    if (!imgLink) return NextResponse.json({ error: 'Failed to upload image' }, { status: 400 });

    const { data, error } = await supabase.from('investment_approaches').insert({
      title,
      description: summary,
      img_link: imgLink,
    }).select().single();

    if (error) {
       console.error('Supabase error inserting investment approach:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const formattedData = {
      ...data,
      ImgLink: data.img_link,
      summary: data.description
    };

    return NextResponse.json(formattedData, { status: 201 });
  } catch (error) {
    console.error('Server error creating investment approach:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
