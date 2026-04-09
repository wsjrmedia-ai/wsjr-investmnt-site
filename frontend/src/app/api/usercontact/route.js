import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendMail } from '@/lib/sendMail';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, description } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const { data: userContact, error } = await supabase.from('user_contacts').insert({
      name,
      email,
      phone,
      message: description || '',
    }).select().single();

    if (error) {
      console.error('Supabase error inserting user contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const subject = 'Thank you for contacting us!';
    const text = `Hi ${name},\n\nThank you for reaching out. We have received your message.\n\nRegards,\nTeam Wall Street Jr`;
    const html = `
<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f7fa" style="padding:40px 0; font-family: Arial, sans-serif;">
  <tr><td align="center">
    <table width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="border-radius:8px; overflow:hidden;">
      <tr><td align="left" style="padding:20px 30px;"><img src="https://wallstreet-investment.vercel.app/Hero/logo.png" alt="WallStreet Jr" style="height:50px;"></td></tr>
      <tr><td align="center" style="padding:10px 20px;"><h2 style="margin:0; color:#000000;">Thank You for Contacting Us!</h2></td></tr>
      <tr><td style="padding:10px 30px; color:#333333; font-size:15px; text-align:center;">Hi ${name},<br><br>Thank you for reaching out. We have received your message and will get back to you.</td></tr>
      <tr><td style="padding:20px 30px; background-color:rgba(20,52,75,0.1); font-size:14px; line-height:22px;">
        <div>Email: ${email}</div><div>Phone: ${phone}</div><div>Message: ${description || 'No message provided'}</div>
      </td></tr>
      <tr><td style="padding:20px 30px; color:#333333; font-size:14px; text-align:center;">We typically respond within <strong>24 - 48 hours</strong>.</td></tr>
      <tr><td style="background-color:#14344B; padding:20px; color:#ffffff; font-size:13px;">
        <p style="margin:0;">See you soon,</p><p style="margin:5px 0 20px; font-weight:bold;">Team Wall Street Jr</p>
        <p style="margin:0;">1901-2-11, City Tower 2, Sheikh Zayed Road, Dubai</p>
        <p><a href="mailto:invest@wallstreetjr.com" style="color:#ffffff;">invest@wallstreetjr.com</a> | <a href="tel:+97145529700" style="color:#ffffff;">+971 4 552 9700</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>`;

    // Attempt to send email, ignoring failure if email config is missing
    try {
      await sendMail(email, subject, text, html);
    } catch (mailError) {
      console.error('Failed to send mail:', mailError);
    }

    return NextResponse.json({ message: 'Contact saved and email sent', userContact }, { status: 201 });
  } catch (error) {
    console.error('Server error creating user contact:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: userContacts, error } = await supabase
      .from('user_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching user contacts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: userContacts }, { status: 200 });
  } catch (error) {
    console.error('Server error fetching user contacts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}