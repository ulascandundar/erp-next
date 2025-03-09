import { Inter } from "next/font/google";
import { ThemeProviders } from "./providers";
import Favicon from "@/public/favicon.ico";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  return {
    icons: { icon: Favicon.src },
  };
}

export default async function RootLayout({ children }) {
  return (
    <ThemeProviders fontFamily={inter.style.fontFamily}>
      {children}
    </ThemeProviders>
  );
}
