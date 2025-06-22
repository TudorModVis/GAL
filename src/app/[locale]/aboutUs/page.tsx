import Donation from "@/app/components/Donation/Donation";
import Hero from "@/app/components/HeroSection/Hero";
import LastNews from "@/app/components/LastNews/LastNews";
import MainSection from "@/app/components/ListAndStatistics/MainSection";
import Members from "@/app/components/Members/Members";
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

  const t = await getTranslations("aboutUs");
  return (
    <>
      <main className="relative mb-[100vh] bg-sand-50">
        <Hero
          heroTitle1={t("heroTitle.1")}
          heroTitle2={t("heroTitle.2")}
          videoSource="../video1.webm"
          posterSource="../videoPoster.jpg"
        />
        <MainSection />
        <LastNews />
        <Members />
        <Donation />
      </main>
    </>
  );
}
