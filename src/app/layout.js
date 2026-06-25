import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fable — Discover & Read Original Ebooks",
    template: "%s | Fable",
  },
  description:
    "Fable is a digital platform connecting ebook lovers with talented writers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FFF1E8",
              color: "#312E81",
              border: "1px solid #F97316",
            },
          }}
        />
       
      </body>
    </html>
  );
}