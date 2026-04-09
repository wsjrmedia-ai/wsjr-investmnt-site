import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('user_contacts').select('email');
    if (error) {
      console.error('Supabase error counting user contacts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const unique = new Set(data.map(r => r.email)).size;
    return NextResponse.json({ count: unique }, { status: 200 });
  } catch (error) {
    console.error('Server error counting user contacts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
