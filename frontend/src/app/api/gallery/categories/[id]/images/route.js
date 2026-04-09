import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadToStorage } from '@/lib/uploadToStorage';

export async function GET(request, { params }) {
  try {
    const categoryId = params?.id;
    if (!categoryId) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });

    const { data, error } = await supabase.from('galleries')
      .select('*')
      .eq('category_id', categoryId)
      .order('order_index');

    if (error) {
      console.error('Supabase error fetching images by category:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching images:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request, { params }) {
  try {
    const categoryId = params?.id;
    if (!categoryId) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });

    const formData = await request.formData();
    const title = formData.get('title');
    const imageFile = formData.get('image');

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const { data: category } = await supabase.from('gallery_categories').select('id').eq('id', categoryId).single();
    if (!category) return NextResponse.json({ error: 'Gallery category not found' }, { status: 404 });

    const imageUrl = await uploadToStorage(imageFile, 'gallery-images');
    if (!imageUrl) return NextResponse.json({ error: 'Failed to upload image' }, { status: 400 });

    const { data, error } = await supabase.from('galleries').insert({
      img_link: imageUrl,
      title: title || '',
      category_id: categoryId,
      is_active: true,
    }).select().single();

    if (error) {
      console.error('Supabase error saving image data:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error adding image to category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
