import Footer from "@/app/components/Footer/Footer";
import NavBar from "@/app/components/NavBar/NavBar";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("index.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // const t = await getTranslations("aboutUs");
  return (
    <>
      <NavBar />
      <main className="relative mb-[100vh] bg-sand-50">

      </main>
      <Footer />
    </>
  );
}
