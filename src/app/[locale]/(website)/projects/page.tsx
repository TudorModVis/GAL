import InfoSection from "@/components/CommonComponents/InfoSection";
import Visualization from "@/components/CommonComponents/Visualization";
// import Visualization from "@/components/CommonComponents/Visualization";
import Donation from "@/components/Donation/Donation";
import { getTranslations, setRequestLocale } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("index.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Projects({
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
					header={t('visualization_header')}
					description={t('visualization_text')}
					type='NEWS'
				/>
        <Donation />
      </main>
    </>
  );
}