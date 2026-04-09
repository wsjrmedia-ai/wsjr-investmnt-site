import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('gallery_categories')
      .select('*, galleries(*)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching gallery categories:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map `galleries` to `images` to match frontend expectations
    const formattedData = data.map(category => ({
      ...category,
      images: category.galleries || []
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error('Server error fetching gallery categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { categoryName } = body;

    if (!categoryName) return NextResponse.json({ error: 'Category name is required' }, { status: 400 });

    const { data, error } = await supabase.from('gallery_categories')
      .insert({ category_name: categoryName })
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating gallery category:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating gallery category:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
