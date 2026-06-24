import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { SITE_EMAIL } from "@/lib/contact";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? SITE_EMAIL;

    if (!apiKey) {
      console.info("[contact] Message captured (Resend not configured):", {
        name,
        email,
        message,
      });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Treasure Digital <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `Contact form — ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
