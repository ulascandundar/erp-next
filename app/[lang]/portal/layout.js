import { Inter } from "next/font/google";
import { ThemeProviders } from "./providers";
import { getDictionary } from "@/dictionaries";
import { getTokenValue } from "@/components/ssrTools";
import { ModalLoginProvider } from "@/components/contexts/modalLoginContext";
import { UserProvider } from "@/components/contexts/userContext";
import { App } from "antd";
import SideBarContainer from "@/components/containers/sidebar";
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

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const tokenValue = await getTokenValue();
  return (
    <ThemeProviders fontFamily={inter.style.fontFamily} lang={lang}>
      <UserProvider lang={lang}>
        <SideBarContainer dict={dict} lang={lang} roles={tokenValue?.role} />
        <section className="lg:ml-72">
          <ModalLoginProvider dict={dict} lang={lang}>
            <App>{children}</App>
          </ModalLoginProvider>
        </section>
        <div className="fixed inset-0 -z-10 bg-gray-50 bg-opacity-50">
          <div className="yellow-bubble left-top-yellow"></div>
          <div className="yellow-bubble right-bottom-yellow"></div>
        </div>
      </UserProvider>
    </ThemeProviders>
  );
}
