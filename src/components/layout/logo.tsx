import Image from "next/image";
import { Link } from "@/i18n/navigation";
import logoDark from "../../../public/logo-dark.png";
import logoWhite from "../../../public/logo-white.png";

// Theme-aware logo. Both images are rendered; CSS swaps them via the `.dark`
// class set by next-themes before paint, so there is no flash or hydration race.
export function Logo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <Image
        src={logoWhite}
        alt={label}
        priority
        className="block h-8 w-auto dark:hidden"
      />
      <Image
        src={logoDark}
        alt=""
        aria-hidden
        priority
        className="hidden h-8 w-auto dark:block"
      />
    </Link>
  );
}
