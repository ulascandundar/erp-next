import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
