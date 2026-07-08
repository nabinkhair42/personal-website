export function isTypingInField() {
  const el = document.activeElement;
  if (!el) return false;

  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;

  return el.getAttribute("contenteditable") === "true";
}
