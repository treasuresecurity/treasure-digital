import { SITE_EMAIL } from "@/lib/contact";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const auditSchema = z.object({
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = auditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, website } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.AUDIT_TO_EMAIL ?? SITE_EMAIL;

    if (!apiKey) {
      // Dev-friendly: accept the submission when Resend is not configured yet.
      console.info("[audit] Lead captured (Resend not configured):", {
        email,
        website: website || "—",
      });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: process.env.AUDIT_FROM_EMAIL ?? "Treasure Digital <onboarding@resend.dev>",
      to: toEmail,
      subject: `Free audit request — ${email}`,
      text: [
        "New free audit lead",
        "",
        `Email: ${email}`,
        `Website: ${website || "Not provided"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
