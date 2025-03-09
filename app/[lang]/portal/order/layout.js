import { getDictionary } from "@/dictionaries";
import SectionHeaderComponent from "@/components/containers/sectionHeader";

export default async function OrderLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <SectionHeaderComponent
        title={dict.order.title}
        dict={dict}
        lang={lang}
      />
      <div className="p-4">{children}</div>
    </>
  );
}
