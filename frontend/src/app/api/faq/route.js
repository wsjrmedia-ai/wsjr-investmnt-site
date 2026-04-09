import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: faqs, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Supabase error fetching FAQs:', error);
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Success', data: faqs }, { status: 200 });
  } catch (error) {
    console.error('Server error fetching FAQs:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const faqs = body.faqs || [];

    // To mirror typical upsert behavior: we can delete everything or perform standard insert
    // Since Investment FAQs might be managed differently, we'll implement a clean-replace behavior:
    await supabase.from('investment_faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (faqs.length > 0) {
      const records = faqs.map((f, i) => ({
        question: f.question,
        answer: f.answer,
        category: f.category || null,
        order_index: i,
        is_active: f.isActive !== undefined ? f.isActive : true,
      }));

      const { data, error } = await supabase.from('investment_faqs').insert(records).select();
      
      if (error) {
        console.error('Supabase error updating FAQs:', error);
        return NextResponse.json({ message: 'Server error updating FAQs', error: error.message }, { status: 500 });
      }

      return NextResponse.json({ message: 'FAQ updated successfully', data }, { status: 200 });
    }

    return NextResponse.json({ message: 'FAQ cleared', data: [] }, { status: 200 });
  } catch (error) {
    console.error('Server error posting FAQs:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}