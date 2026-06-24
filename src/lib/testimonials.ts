// Homepage testimonials (master-plan §6).
// `key` maps into the "testimonials.items" message namespace.
export const testimonialKeys = ["finproClient", "webShopClient"] as const;

export type TestimonialKey = (typeof testimonialKeys)[number];
