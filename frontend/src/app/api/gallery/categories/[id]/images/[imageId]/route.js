import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request, { params }) {
  try {
    const imageId = params?.imageId;
    if (!imageId) return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });

    const formData = await request.formData();
    const title = formData.get('title');
    const imageFile = formData.get('image');

    const { data: existing, error: fetchErr } = await supabase.from('galleries').select('*').eq('id', imageId).single();
    
    if (fetchErr || !existing) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    let imgLink = existing.img_link;
    if (imageFile && imageFile.size > 0) {
      imgLink = await uploadToStorage(imageFile, 'gallery-images');
      if (!imgLink) return NextResponse.json({ error: 'Failed to upload image' }, { status: 400 });
    }

    const { data, error } = await supabase.from('galleries')
      .update({ img_link: imgLink, title: title || existing.title })
      .eq('id', imageId)
      .select()
      .single();

    if (error) {
       console.error('Supabase error updating image data:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error updating image in category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const imageId = params?.imageId;
    if (!imageId) return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });

    const { error } = await supabase.from('galleries').delete().eq('id', imageId);
    
    if (error) {
      console.error('Supabase error deleting image:', error);
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting image from category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
