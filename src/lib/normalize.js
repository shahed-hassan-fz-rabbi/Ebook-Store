export function normalizeEbook(raw = {}) {
  const author = raw.author || {};
  return {
    id: raw._id,
    title: raw.title || "Untitled",
    description: raw.description || "",
    content: raw.content || "",
    cover: raw.coverImage || null,
    genre: raw.genre || "General",
    language: raw.language || "English",
    price: Number(raw.price) || 0,
    status: raw.status || "published",
    isPublished: raw.status === "published",
    totalSales: raw.totalSales ?? 0,
    averageRating: raw.averageRating ?? 0,
    createdAt: raw.createdAt || null,
    author: {
      id: author._id || null,
      name: author.name || "Unknown Writer",
      photo: author.photo || null,
    },
  };
}

export function normalizeWriter(raw = {}) {
  const w = raw.author || raw.writer || raw;
  return {
    id: w._id || raw._id || null,
    name: w.name || raw.name || "Writer",
    photo: w.photo || w.image || raw.photo || null,
    totalSales: raw.totalSales ?? raw.salesCount ?? raw.count ?? 0,
    totalRevenue: raw.totalRevenue ?? raw.revenue ?? 0,
  };
}


export function unwrapList(res) {
  const d = res?.data;
  if (Array.isArray(d)) return { items: d, meta: null };
  if (Array.isArray(d?.result)) return { items: d.result, meta: d.meta || null };
  return { items: [], meta: null };
}

export function unwrapOne(res) {
  return res?.data || null;
}