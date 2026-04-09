import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Banner ID is required' }, { status: 400 });

    const formData = await request.formData();
    const bannerName = formData.get('bannerName');
    const link = formData.get('link');
    const deskImgFile = formData.get('deskImgLink');
    const mobImgFile = formData.get('mobImgLink');

    const { data: existing, error: fetchError } = await supabase.from('banners').select('*').eq('id', id).single();
    if (fetchError || !existing) return NextResponse.json({ message: 'Banner not found' }, { status: 404 });

    let deskImgUrl = existing.desk_img_link;
    let mobImgUrl = existing.mob_img_link;

    if (deskImgFile && deskImgFile.size > 0) {
      deskImgUrl = await uploadToStorage(deskImgFile, 'banner-images');
      if (!deskImgUrl) return NextResponse.json({ message: 'Failed to upload desktop image' }, { status: 400 });
    }

    if (mobImgFile && mobImgFile.size > 0) {
      mobImgUrl = await uploadToStorage(mobImgFile, 'banner-images');
      if (!mobImgUrl) return NextResponse.json({ message: 'Failed to upload mobile image' }, { status: 400 });
    }

    const { data: banner, error } = await supabase.from('banners').update({
      banner_name: bannerName || existing.banner_name,
      desk_img_link: deskImgUrl,
      mob_img_link: mobImgUrl,
      link: link || existing.link,
    }).eq('id', id).select().single();

    if (error) {
      console.error('Supabase error updating banner:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Banner updated successfully', banner }, { status: 200 });
  } catch (error) {
    console.error('Server error updating banner:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Banner ID is required' }, { status: 400 });

    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) {
      console.error('Supabase error deleting banner:', error);
      return NextResponse.json({ message: 'Server error or Banner not found', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Banner deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting banner:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
