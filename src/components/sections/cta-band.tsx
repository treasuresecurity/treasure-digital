"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { pushLeadEvent } from "@/components/seo/google-tag-manager";
import { cn } from "@/lib/utils";

function buildSchema(messages: {
  emailRequired: string;
  emailInvalid: string;
  urlInvalid: string;
}) {
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    website: z
      .string()
      .optional()
      .refine(
        (val) => !val || val === "" || z.string().url().safeParse(val).success,
        messages.urlInvalid,
      ),
  });
}

type AuditFormValues = z.infer<ReturnType<typeof buildSchema>>;

export function AuditForm({ className }: { className?: string }) {
  const t = useTranslations("auditForm");
  const schema = buildSchema({
    emailRequired: t("errors.emailRequired"),
    emailInvalid: t("errors.emailInvalid"),
    urlInvalid: t("errors.urlInvalid"),
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", website: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      pushLeadEvent("audit_form");
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
        <label htmlFor="audit-email" className="text-small font-medium text-text">
          {t("emailLabel")}
        </label>
        <input
          id="audit-email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "audit-email-error" : undefined}
          className="h-12 w-full rounded-btn border border-border bg-bg px-4 text-body text-text transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("email")}
        />
        {errors.email && (
          <p id="audit-email-error" className="text-small text-accent">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="audit-website"
          className="text-small font-medium text-text"
        >
          {t("websiteLabel")}{" "}
          <span className="text-text-muted">({t("optional")})</span>
        </label>
        <input
          id="audit-website"
          type="url"
          autoComplete="url"
          placeholder={t("websitePlaceholder")}
          aria-invalid={errors.website ? true : undefined}
          aria-describedby={errors.website ? "audit-website-error" : undefined}
          className="h-12 w-full rounded-btn border border-border bg-bg px-4 text-body text-text transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("website")}
        />
        {errors.website && (
          <p id="audit-website-error" className="text-small text-accent">
            {errors.website.message}
          </p>
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

export function CtaBand() {
  const t = useTranslations("ctaBand");
  const tc = useTranslations("common");

  return (
    <section className="relative overflow-hidden border-t border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 [background:var(--gradient-brand)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("eyebrow")}
          </span>
          <h2 className="measure text-balance font-display text-h2 font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="measure text-body text-text-muted">{t("subtitle")}</p>
          <Link
            href="/kontakti"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-fit")}
          >
            {tc("cta")}
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="mb-6 font-display text-h3 font-bold tracking-tight">
            {t("formTitle")}
          </h3>
          <AuditForm />
        </div>
      </div>
    </section>
  );
}
