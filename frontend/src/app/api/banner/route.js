import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function GET() {
  try {
    const { data: banners, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching banners:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json(banners, { status: 200 });
  } catch (error) {
    console.error('Server error fetching banners:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const bannerName = formData.get('bannerName');
    const link = formData.get('link');
    const deskImgFile = formData.get('deskImgLink');
    const mobImgFile = formData.get('mobImgLink');

    if (!bannerName || !deskImgFile || !mobImgFile) {
      return NextResponse.json({ message: 'Banner name and both images are required' }, { status: 400 });
    }

    const deskImgUrl = await uploadToStorage(deskImgFile, 'banner-images');
    const mobImgUrl = await uploadToStorage(mobImgFile, 'banner-images');

    if (!deskImgUrl || !mobImgUrl) {
      return NextResponse.json({ message: 'Failed to upload one or both images' }, { status: 400 });
    }

    const { data: banner, error } = await supabase.from('banners').insert({
      banner_name: bannerName,
      desk_img_link: deskImgUrl,
      mob_img_link: mobImgUrl,
      link: link || '/',
    }).select().single();

    if (error) {
      console.error('Supabase error inserting banner:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Banner added successfully', banner }, { status: 201 });
  } catch (error) {
    console.error('Server error adding banner:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}