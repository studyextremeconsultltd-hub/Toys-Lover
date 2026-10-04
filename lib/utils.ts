export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SMALL_CAPS = /^(UK|USA|STEM|FAQ|PCI|GB|AM|PM)$/i;

export function toTitleCase(value: string) {
  return value.replace(/[A-Za-zÀ-ÿ’']+/g, (word) => {
    if (SMALL_CAPS.test(word)) return word.toUpperCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}

