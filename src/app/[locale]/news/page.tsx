import InfoSection from "@/app/components/CommonComponents/InfoSection";
import Visualization from "@/app/components/CommonComponents/Visualization";
import Donation from "@/app/components/Donation/Donation";
import { getTranslations, setRequestLocale } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("index.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Administration({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // const t = await getTranslations("aboutUs.administration");
  return (
    <>
      <main className="relative w-full h-fit mb-[100vh] bg-sand-50">
        <InfoSection
          tags={["Produse Locale"]}
          headerText="Rămâi informat și urmărește ultimele noutăți de la echipa noastră."
          lastActualization="23.03.2025"
          location={["Acasă", "Noutăți"]}
          imageSrc="/donation_image.png"
          imageAlt="Test"
        />
        <Visualization
          header="Care este impactul?"
          description="Grupul de Acțiune Locală „Stejarul Dacilor” este o asociație constituită în noiembrie 2023, care reunește 14 unități administrativ-teritoriale din raioanele Cimișlia și Căușeni, având scopul de a promova dezvoltarea rurală durabilă implementând Strategiei de Dezvoltare Locală 2023–2027."
        />
        <Donation />
      </main>
    </>
  );
}
