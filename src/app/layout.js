import "./globals.css";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToastProvider from "@/components/providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fable Ebook Platform",
    template: "%s | Fable",
  },
  description:
    "Fable is a digital platform connecting ebook lovers with talented writers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}