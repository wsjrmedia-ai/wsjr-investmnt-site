import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Collaboration ID is required' }, { status: 400 });

    const formData = await request.formData();
    const bannerName = formData.get('bannerName');
    const link = formData.get('link');
    const logoFile = formData.get('deskImgLink');

    const { data: existing, error: fetchError } = await supabase.from('collaborations').select('*').eq('id', id).single();
    if (fetchError || !existing) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    let logoLink = existing.logo_link;
    if (logoFile && logoFile.size > 0) {
      logoLink = await uploadToStorage(logoFile, 'collaboration-logos');
      if (!logoLink) return NextResponse.json({ message: 'Failed to upload image' }, { status: 400 });
    }

    const { data: banner, error } = await supabase.from('collaborations').update({
      name: bannerName || existing.name,
      logo_link: logoLink,
      website_url: link || existing.website_url,
    }).eq('id', id).select().single();

    if (error) {
       console.error('Supabase error updating collaboration:', error);
       return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Banner updated successfully', banner }, { status: 200 });
  } catch (error) {
    console.error('Server error updating collaboration:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Collaboration ID is required' }, { status: 400 });

    const { error } = await supabase.from('collaborations').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting collaboration:', error);
       return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Banner deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting collaboration:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
