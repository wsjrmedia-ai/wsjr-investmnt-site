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

    const { data: existing } = await supabase.from('team_images').select('id').eq('caption', 'team').maybeSingle();

    let result;
    if (existing) {
      const { data, error } = await supabase.from('team_images').update({ img_link: imgUrl }).eq('id', existing.id).select().single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase.from('team_images').insert({ img_link: imgUrl, caption: 'team', order_index: 1 }).select().single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      teamImage: { url: result.img_link, title: title || 'Team Image', description: description || '' },
    }, { status: 200 });
  } catch (error) {
    console.error('Server error updating team image:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase.from('team_images').update({ img_link: '' }).eq('caption', 'team');
    if (error) {
       console.error('Supabase error deleting team image:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ teamImage: { url: '', title: 'Team Image', description: '' } }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting team image:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
