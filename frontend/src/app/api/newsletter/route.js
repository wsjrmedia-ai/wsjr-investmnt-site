import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendMail } from '@/lib/sendMail';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data: existing } = await supabase.from('newsletters').select('id').eq('email', email).maybeSingle();
    if (existing) return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });

    const { data: subscriber, error } = await supabase.from('newsletters').insert({ email }).select().single();
    if (error) {
      console.error('Supabase error inserting newsletter subscriber:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const subject = 'Thanks for subscribing to our Newsletter!';
    const text = `Hi,\n\nThanks for subscribing to our newsletter. We'll keep you updated!`;
    const html = `
<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f7fa" style="padding:40px 0; font-family: Arial, sans-serif;">
  <tr><td align="center">
    <table width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="border-radius:8px; overflow:hidden;">
      <tr><td align="left" style="padding:20px 30px;"><img src="https://wallstreet-investment.vercel.app/Hero/logo.png" alt="WallStreet Jr" style="height:50px;"></td></tr>
      <tr><td align="center" style="padding:10px 20px;"><h2 style="margin:0; color:#000000;">Thank You for Subscribing!</h2></td></tr>
      <tr><td style="padding:10px 30px; color:#333333; font-size:15px; text-align:center;">Hi,<br><br>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news, insights, and updates.</td></tr>
      <tr><td style="padding:20px 30px; color:#333333; font-size:14px; text-align:center;">We typically send updates periodically. You can unsubscribe at any time.</td></tr>
      <tr><td style="background-color:#14344B; padding:20px; color:#ffffff; font-size:13px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr><td align="left"><p style="margin:0; font-size:15px;">See you soon,</p><p style="margin:5px 0 20px; font-size:15px; font-weight:bold;">Team Wall Street Jr</p></td></tr>
          <tr><td align="center" style="padding:12px;"><p style="margin:0; color:#ffffff; font-size:13px;">1901-2-11, City Tower 2, Sheikh Zayed Road, Dubai</p><p style="margin:5px 0;"><a href="mailto:invest@wallstreetjr.com" style="color:#ffffff;">invest@wallstreetjr.com</a> | <a href="tel:+97145529700" style="color:#ffffff;">+971 4 552 9700</a></p></td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>`;

    try {
      await sendMail(email, subject, text, html);
    } catch (mailError) {
      console.error('Failed to send newsletter email:', mailError);
    }

    return NextResponse.json({ message: 'Subscribed successfully', subscriber }, { status: 201 });
  } catch (error) {
    console.error('Server error creating subscriber:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';

    let query = supabase.from('newsletters').select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) {
      query = query.ilike('email', `%${search}%`);
    }

    const { data: subscribers, count, error } = await query;
    if (error) {
      console.error('Supabase error fetching subscribers:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: subscribers,
      total: count,
      page,
      pages: Math.ceil((count || 0) / limit),
    }, { status: 200 });
  } catch (error) {
    console.error('Server error fetching subscribers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}