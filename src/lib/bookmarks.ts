export const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export const getFaviconUrl = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=32`;
