"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushLeadEvent } from "@/components/seo/google-tag-manager";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_VIBER_URL,
  SITE_WHATSAPP_URL,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

function buildSchema(messages: {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
}) {
  return z.object({
    name: z.string().min(1, messages.nameRequired),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    message: z.string().min(1, messages.messageRequired),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof buildSchema>>;

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations("contactForm");
  const schema = buildSchema({
    nameRequired: t("errors.nameRequired"),
    emailRequired: t("errors.emailRequired"),
    emailInvalid: t("errors.emailInvalid"),
    messageRequired: t("errors.messageRequired"),
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      pushLeadEvent("contact_form");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "rounded-2xl border border-border bg-surface p-6 text-body text-text",
          className,
        )}
      >
        {t("success")}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-small font-medium text-text">
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          className="h-12 w-full rounded-btn border border-border bg-bg px-4 text-body text-text transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-small text-accent">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-small font-medium text-text">
          {t("emailLabel")}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          className="h-12 w-full rounded-btn border border-border bg-bg px-4 text-body text-text transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-small text-accent">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-small font-medium text-text"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          className="w-full resize-y rounded-btn border border-border bg-bg px-4 py-3 text-body text-text transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-small text-accent">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-small text-accent">
          {t("error")}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

export function ContactChannels({ className }: { className?: string }) {
  const t = useTranslations("contactPage");

  const channels = [
    {
      key: "phone",
      href: SITE_PHONE_TEL,
      icon: Phone,
      label: t("channels.phone"),
      value: SITE_PHONE_DISPLAY,
    },
    {
      key: "viber",
      href: SITE_VIBER_URL,
      icon: MessageCircle,
      label: t("channels.viber"),
      value: SITE_PHONE_DISPLAY,
    },
    {
      key: "whatsapp",
      href: SITE_WHATSAPP_URL,
      icon: MessageCircle,
      label: t("channels.whatsapp"),
      value: SITE_PHONE_DISPLAY,
    },
  ];

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {channels.map(({ key, href, icon: Icon, label, value }) => (
        <li key={key}>
          <a
            href={href}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/30"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-small text-text-muted">{label}</span>
              <span className="text-body font-medium text-text">{value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
