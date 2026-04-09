import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: all, error } = await supabase.from('news_items').select('category, market_impact');

    if (error) {
      console.error('Supabase error getting stats:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const categoryMap = {};
    const impactMap = {};

    all?.forEach(item => {
      if (item.category) categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
      if (item.market_impact) impactMap[item.market_impact] = (impactMap[item.market_impact] || 0) + 1;
    });

    const categoryStats = Object.entries(categoryMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count);

    const impactStats = Object.entries(impactMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ categoryStats, impactStats }, { status: 200 });
  } catch (error) {
    console.error('Server error getting stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
