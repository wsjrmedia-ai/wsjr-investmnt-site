import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { count, error } = await supabase.from('newsletters').select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase error counting subscribers:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Server error counting subscribers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
