import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });

    const { data, error } = await supabase.from('job_posts').select('*').eq('id', id).single();
    if (error || !data) {
       console.error('Supabase error fetching job by ID:', error);
       return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error fetching job by ID:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });

    const body = await request.json();
    const { data, error } = await supabase.from('job_posts').update({
      title: body.title || body.jobName,
      description: body.description || body.jobDescription,
      requirements: body.requirements,
      location: body.location,
      job_type: body.jobType || body.job_type,
      salary_range: body.salaryRange || body.salary_range,
      is_active: body.isActive,
    }).eq('id', id).select().single();

    if (error || !data) {
       console.error('Supabase error updating job:', error);
       return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error updating job:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });

    const { error } = await supabase.from('job_posts').delete().eq('id', id);
    if (error) {
       console.error('Supabase error deleting job:', error);
       return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Job deleted' }, { status: 200 });
  } catch (error) {
    console.error('Server error deleting job:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
