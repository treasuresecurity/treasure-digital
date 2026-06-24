import { BUSINESS, formatPostalAddress } from "@/lib/business";
import {
  SITE_EMAIL,
  SITE_MAILTO,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/contact";
import {
  TrackedEmailLink,
  TrackedPhoneLink,
} from "@/components/ui/tracked-contact-link";
import { cn } from "@/lib/utils";

export function NapBlock({
  className,
  showLegalName = false,
  location = "nap_block",
}: {
  className?: string;
  showLegalName?: boolean;
  location?: string;
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
      <TrackedPhoneLink
        href={SITE_PHONE_TEL}
        location={location}
        className="mt-2 block transition-colors hover:text-text"
      >
        <span itemProp="telephone">{SITE_PHONE_DISPLAY}</span>
      </TrackedPhoneLink>
      <TrackedEmailLink
        href={SITE_MAILTO}
        location={location}
        className="mt-1 block transition-colors hover:text-text"
      >
        <span itemProp="email">{SITE_EMAIL}</span>
      </TrackedEmailLink>
      <meta itemProp="areaServed" content={formatPostalAddress()} />
    </address>
  );
}
