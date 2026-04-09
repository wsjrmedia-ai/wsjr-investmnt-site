import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });

    const formData = await request.formData();
    const title = formData.get('title');
    const summary = formData.get('summary');
    const imageFile = formData.get('ImgLink');

    const { data: existing, error: fetchError } = await supabase.from('investment_approaches').select('*').eq('id', id).single();
    if (fetchError || !existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    let imgLink = existing.img_link;
    if (imageFile && imageFile.size > 0) {
      imgLink = await uploadToStorage(imageFile, 'service-images');
      if (!imgLink) return NextResponse.json({ error: 'Failed to upload image' }, { status: 400 });
    }

    const { data, error } = await supabase.from('investment_approaches').update({
      title: title || existing.title,
      description: summary || existing.description,
      img_link: imgLink,
    }).eq('id', id).select().single();

    if (error) {
       console.error('Supabase error updating investment approach:', error);
       return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const formattedData = {
      ...data,
      ImgLink: data.img_link,
      summary: data.description
    };

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Server error updating investment approach:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });

    const { error } = await supabase.from('investment_approaches').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting investment approach:', error);
       return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting investment approach:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
