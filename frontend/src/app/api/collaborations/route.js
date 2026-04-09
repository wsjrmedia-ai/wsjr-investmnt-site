import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function GET() {
  try {
    const { data: collaborations, error } = await supabase
      .from('collaborations')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Supabase error fetching collaborations:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json(collaborations, { status: 200 });
  } catch (error) {
    console.error('Server error fetching collaborations:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const bannerName = formData.get('bannerName');
    const link = formData.get('link');
    const logoFile = formData.get('deskImgLink');

    if (!bannerName || !logoFile || logoFile.size === 0) {
      return NextResponse.json({ message: 'Name and image are required' }, { status: 400 });
    }

    const logoUrl = await uploadToStorage(logoFile, 'collaboration-logos');
    if (!logoUrl) return NextResponse.json({ message: 'Failed to upload image' }, { status: 400 });

    const { data: banner, error } = await supabase.from('collaborations').insert({
      name: bannerName,
      logo_link: logoUrl,
      website_url: link || '/',
    }).select().single();

    if (error) {
      console.error('Supabase error inserting collaboration:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Banner added successfully', banner }, { status: 201 });
  } catch (error) {
    console.error('Server error adding collaboration:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
