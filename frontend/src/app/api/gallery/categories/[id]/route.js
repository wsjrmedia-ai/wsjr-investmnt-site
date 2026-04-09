import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });

    const { data, error } = await supabase.from('gallery_categories')
      .select('*, galleries(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Supabase error fetching gallery category by ID:', error);
      return NextResponse.json({ error: 'Gallery category not found' }, { status: 404 });
    }

    const formattedData = {
      ...data,
      images: data.galleries || []
    };

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Server error fetching gallery category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });

    const body = await request.json();
    const { categoryName } = body;

    if (!categoryName) return NextResponse.json({ error: 'Category name is required' }, { status: 400 });

    const { data, error } = await supabase.from('gallery_categories')
      .update({ category_name: categoryName })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Supabase error updating gallery category:', error);
      return NextResponse.json({ error: 'Gallery category not found or error updating' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error updating gallery category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });

    const { error } = await supabase.from('gallery_categories').delete().eq('id', id);
    if (error) {
      console.error('Supabase error deleting gallery category:', error);
      return NextResponse.json({ error: 'Gallery category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Gallery category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting gallery category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
