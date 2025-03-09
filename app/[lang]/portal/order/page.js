import { getDictionary } from "@/dictionaries";
import SectionHeaderComponent from "@/components/containers/sectionHeader";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.order.title} | ${dict.public.title}`,
  };
}

export default async function OrderPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <>{dict.order.title}</>;
}
