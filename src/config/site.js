export const siteConfig = {
  name: "Fable",
  tagline: "Discover & Read Original Ebooks",
  description:
    "A digital platform connecting ebook lovers with talented writers.",
};

// Public top-nav links
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Ebooks", href: "/browse" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Dashboard route per role
export const dashboardPath = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export const footerLinks = {
  Product: [
    { label: "Browse", href: "/browse" },
    { label: "Top Writers", href: "/#top-writers" },
    { label: "Genres", href: "/browse" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  Resources: [
    { label: "Become a Writer", href: "/register" },
    { label: "Help Center", href: "/contact" },
  ],
};