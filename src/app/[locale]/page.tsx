import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "../components/HeroSection/Hero";
import AboutUs from "../components/AboutUs/AboutUs";
import LastNews from "../components/LastNews/LastNews";
import Breaker from "../components/Breaker/Breaker";
import Donation from "../components/Donation/Donation";
import CompletedProjects from "../components/CompletedProjects/CompletedProjects";

export async function generateMetadata() {
  const t = await getTranslations("index.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("index");
  return (
    <>
      <main className="relative mb-[100vh] bg-sand-50">
        <Hero
          heroTitle1={t("heroTitle.1")}
          heroTitle2={t("heroTitle.2")}
          videoSource="/video1.webm"
          posterSource="/videoPoster.jpg"
        />
        <AboutUs />
        <LastNews />
        <Breaker />
        <CompletedProjects />
        <Donation />
      </main>
    </>
  );
}
