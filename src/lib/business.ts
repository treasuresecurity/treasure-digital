/** Central business facts for SEO schema and NAP consistency. */
export const BUSINESS = {
  legalName: "Treasure Security Ltd.",
  displayName: "Treasure Digital",
  addressLocality: "Plovdiv",
  addressCountry: "BG",
  addressCountryName: "Bulgaria",
  areaServed: ["Bulgaria", "European Union", "Worldwide"],
  founderName: "Treasure Digital",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61550485887620",
    "https://github.com/treasuresecurity/treasure-digital-gods",
  ],
} as const;

export function formatPostalAddress() {
  return `${BUSINESS.addressLocality}, ${BUSINESS.addressCountryName}`;
}
