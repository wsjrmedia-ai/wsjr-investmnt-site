import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('job_posts').select('*').order('posted_at', { ascending: false });
    if (error) {
       console.error('Supabase error fetching jobs:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching jobs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('job_posts').insert({
      title: body.title || body.jobName,
      description: body.description || body.jobDescription,
      requirements: body.requirements || '',
      location: body.location,
      job_type: body.jobType || body.job_type,
      salary_range: body.salaryRange || body.salary_range || '',
      is_active: body.isActive !== undefined ? body.isActive : true,
    }).select().single();

    if (error) {
       console.error('Supabase error creating job:', error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error creating job:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
