import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const imgUrl = await uploadToStorage(imageFile, 'team-images');
    if (!imgUrl) return NextResponse.json({ error: 'Failed to upload image' }, { status: 400 });

    const { data: existing } = await supabase.from('team_images').select('id').eq('caption', 'founder').maybeSingle();

    let result;
    if (existing) {
      const { data, error } = await supabase.from('team_images').update({ img_link: imgUrl }).eq('id', existing.id).select().single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase.from('team_images').insert({ img_link: imgUrl, caption: 'founder', order_index: 0 }).select().single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      founderImage: { url: result.img_link, title: title || 'Founder Image', description: description || '' },
    }, { status: 200 });
  } catch (error) {
    console.error('Server error updating founder image:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase.from('team_images').update({ img_link: '' }).eq('caption', 'founder');
    if (error) {
       console.error('Supabase error deleting founder image:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ founderImage: { url: '', title: 'Founder Image', description: '' } }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting founder image:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
