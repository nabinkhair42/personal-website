export function formatDate(date: string, style: "long" | "short" = "short") {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}
