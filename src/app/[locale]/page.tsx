import { Link, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("");
  return (
    <div className="text-red-500">
      <p className="">{t("title")}</p>
      <Link href="/">home</Link>
      <Link href="/about">about</Link>
    </div>
  );
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

