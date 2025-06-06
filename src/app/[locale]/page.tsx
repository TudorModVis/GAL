import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "../components/HeroSection/Hero";
import AboutUs from "../components/AboutUs/AboutUs";
import LastNews from "../components/LastNews/LastNews";
import Breaker from "../components/Breaker/Breaker";

export async function generateMetadata() {
  const t = await getTranslations('index.meta');
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home({params}: {params: Promise<{locale: string}>;}) {
  const {locale} = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('index');
  const tBreaker = await getTranslations("index.Breaker");
  return (
    <>
      <main className="relative">
        <Hero heroTitle1={t('heroTitle.1')} heroTitle2={t('heroTitle.2')} />
        <AboutUs />
        <LastNews />
        <Breaker />
      </main>
    </>
  );
}