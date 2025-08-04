export const getClientIP = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'unknown';
  }
};

// Function to track blog view
export const trackBlogView = async (blogId: string, slug: string) => {
  try {
    const ip = await getClientIP();
    const response = await fetch('/api/blog/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId,
        slug,
        ip,
      }),
    });

    const data = await response.json();
    return data.metrics;
  } catch (error) {
    console.error('Error tracking blog view:', error);
    return null;
  }
};

// Function to get blog metrics
export const getBlogMetrics = async (slug: string) => {
  try {
    const response = await fetch(
      `/api/blog/metrics?slug=${encodeURIComponent(slug)}`
    );
    const data = await response.json();
    return data.metrics;
  } catch (error) {
    console.error('Error getting blog metrics:', error);
    return null;
  }
};

// Function to update blog reaction
export const updateBlogReaction = async (
  slug: string,
  emoji: string,
  action: 'add' | 'remove'
) => {
  try {
    const response = await fetch('/api/blog/metrics', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
        emoji,
        action,
      }),
    });

    const data = await response.json();
    return data.metrics;
  } catch (error) {
    console.error('Error updating blog reaction:', error);
    return null;
  }
};
