import { getDictionary } from "@/dictionaries";
import SectionHeaderComponent from "@/components/containers/sectionHeader";

export default async function ProductLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <SectionHeaderComponent
        title={dict.product.title}
        dict={dict}
        lang={lang}
      />
      <div className="p-4">{children}</div>
    </>
  );
}
