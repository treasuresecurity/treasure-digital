import { BUSINESS, formatPostalAddress } from "@/lib/business";
import {
  SITE_EMAIL,
  SITE_MAILTO,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

export function NapBlock({
  className,
  showLegalName = false,
}: {
  className?: string;
  showLegalName?: boolean;
}) {
  return (
    <address
      className={cn("not-italic text-body text-text-muted", className)}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <span itemProp="name" className="block font-medium text-text">
        {BUSINESS.displayName}
      </span>
      {showLegalName && (
        <span className="mt-1 block text-small">{BUSINESS.legalName}</span>
      )}
      <span
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
        className="mt-2 block"
      >
        <span itemProp="addressLocality">{BUSINESS.addressLocality}</span>
        {", "}
        <span itemProp="addressCountry">{BUSINESS.addressCountryName}</span>
      </span>
      <a
        href={SITE_PHONE_TEL}
        itemProp="telephone"
        className="mt-2 block transition-colors hover:text-text"
      >
        {SITE_PHONE_DISPLAY}
      </a>
      <a
        href={SITE_MAILTO}
        itemProp="email"
        className="mt-1 block transition-colors hover:text-text"
      >
        {SITE_EMAIL}
      </a>
      <meta itemProp="areaServed" content={formatPostalAddress()} />
    </address>
  );
}
