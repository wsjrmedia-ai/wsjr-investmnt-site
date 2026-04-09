import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('team_images').select('*').order('order_index');
    if (error) {
       console.error('Supabase error fetching team images:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const founderRow = data.find(r => r.caption === 'founder') || { img_link: '', caption: 'founder' };
    const teamRow = data.find(r => r.caption === 'team') || { img_link: '', caption: 'team' };

    return NextResponse.json({
      founderImage: { url: founderRow.img_link, title: 'Founder Image', description: '' },
      teamImage: { url: teamRow.img_link, title: 'Team Image', description: '' },
      _raw: data,
    }, { status: 200 });
  } catch (error) {
    console.error('Server error fetching team images:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
