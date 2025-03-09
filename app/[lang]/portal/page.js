"use server";

import { getDictionary } from "@/dictionaries";
import SectionHeaderComponent from "@/components/containers/sectionHeader";
import DashboardPage from "./dashboard";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.dashboard.title} | ${dict.public.title}`,
  };
}

export default async function Dashboard({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <SectionHeaderComponent
        title={dict.dashboard.title}
        dict={dict}
        lang={lang}
      />
      <div className="p-4">
        <DashboardPage dict={dict} lang={lang} />
      </div>
    </>
  );
}
