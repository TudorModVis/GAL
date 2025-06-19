import AnimatedHeader from "@/app/components/CommonComponents/AnimatedHeader";
import AnimatedLine from "@/app/components/CommonComponents/AnimatedLine";
import AnimatedText from "@/app/components/CommonComponents/AnimatedText";
import InfoSection from "@/app/components/CommonComponents/InfoSection";
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
      <NavBar onlyFixed={true} />
      <main className="relative mb-[100vh] bg-sand-50">
        <InfoSection
          tags={[
            "Președintele",
            "Organul Executiv",
            "Adunare Generală",
            "Consiliul de Administrare",
            "Comitetul de Selectare",
            "Comisia de Cenzori",
          ]}
          headerText="Conducerea GAL-ului"
          lastActualization="23.03.2025"
          location={["Acasă", "Despre GAL", "Conducerea GAL-ului"]}
          imageSrc="/donation_image.png"
          imageAlt="Test"
        />
        <section className="w-screen h-fit flex flex-col">
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Președintele"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText text="Detalii" customStyles="font-bold col-span-3" />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="Valeriu Guțu, Primarul  c.Cioresti" />
              <AnimatedText text="Lilian Botnaru, Primarul c.Lozova" />
              <AnimatedText text="Rodica Butnaru,  Primarul c.Milceușeni" />
              <AnimatedText text="Nicanor Ciochină,  Primarul c.Boldurești" />
              <AnimatedText text="Vasile Tofan, Primarul s.Vorniceni" />
              <AnimatedText text="Necula Valentina, Concucător GT Necula Valentina" />
              <AnimatedText text="Dubac Marina,  Fondator GȚ Lazariuc Marina Vladimir" />
              <AnimatedText text="Cataraga Constantin,  Fondator  ÎI Cataraga Constantin" />
              <AnimatedText text="Coda Aurelia, SRL IVENTI" />
              <AnimatedText text="Stamati Grigore,  Președinte AO Rădăcinile Ciuteștilor" />
              <AnimatedText text="Ilie Sicinava, Președinte AO a utilizatorilor de apă Bălănești" />
            </div>
          </div>
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Organul Executiv"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText text="Detalii" customStyles="font-bold col-span-3" />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="Valeriu Guțu, Primarul  c.Cioresti" />
              <AnimatedText text="Lilian Botnaru, Primarul c.Lozova" />
              <AnimatedText text="Rodica Butnaru,  Primarul c.Milceușeni" />
              <AnimatedText text="Nicanor Ciochină,  Primarul c.Boldurești" />
              <AnimatedText text="Vasile Tofan, Primarul s.Vorniceni" />
              <AnimatedText text="Necula Valentina, Concucător GT Necula Valentina" />
              <AnimatedText text="Dubac Marina,  Fondator GȚ Lazariuc Marina Vladimir" />
              <AnimatedText text="Cataraga Constantin,  Fondator  ÎI Cataraga Constantin" />
              <AnimatedText text="Coda Aurelia, SRL IVENTI" />
              <AnimatedText text="Stamati Grigore,  Președinte AO Rădăcinile Ciuteștilor" />
              <AnimatedText text="Ilie Sicinava, Președinte AO a utilizatorilor de apă Bălănești" />
            </div>
          </div>
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Adunarea Generală"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText
              text="Registrul Membrilor GAL"
              customStyles="font-bold col-span-3"
            />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="1. <b>Valeriu Spînu</b>, Primăria comunei Codreni, primar, IDNO/IDNP: 1007601005903" />
              <AnimatedText text="2. <b>Anatolie Spînu</b>, Primăria satului Batîr, primar, IDNO/IDNP: 1007601005899" />
              <AnimatedText text="3. <b>Pîrlog Sergiu</b>, Primăria satului Ciuflești, primar, IDNO/IDNP: 1007601005198" />
              <AnimatedText text="4. <b>Ciobanu Svetlana</b>, Primăria comunei Ecaterinovca, primar, IDNO/IDNP: 1007601008845" />
              <AnimatedText text="5. <b>Faureanu Iurie</b>, Primăria comunei Porumbrei, primar, IDNO/IDNP: 1007601005925" />
              <AnimatedText text="6. <b>Cucereavîi Vladimir</b>, Primăria satului Taraclia, primar, IDNO/IDNP: 1007601003792" />
              <AnimatedText text="7. <b>Cojocaru Ion</b>, Primăria satului Sagaidac, primar, IDNO/IDNP: 1007601005660" />
              <AnimatedText text="8. <b>Badan Tatiana</b>, Primăria satului Selemet, primar, IDNO/IDNP: 1007601008801" />
              <AnimatedText text="9. <b>Bumbu Marin</b>, Primăria satului Satul Nou, primar, IDNO/IDNP: 1007601008926" />
              <AnimatedText text="10. <b>Ghenciu Alexandru</b>, Primăria satului Suric, primar, IDNO/IDNP: 1007601008694" />
              <AnimatedText text="11. <b>Sturza Alexandru</b>, Primăria satului Mihailovca, primar, IDNO/IDNP: 1007601008834" />
              <AnimatedText text="12. <b>Lungu Ion</b>, G.Ț. „Lungu Ion Nicolae s. Porumbrei”, conducător, IDNO/IDNP: 34955440" />
              <AnimatedText text="13. <b>Strogoțeanu Galina</b>, G.Ț. „Gaibu Serghei Fiodor”, angajată, IDNO/IDNP: 34613445" />
              <AnimatedText text="14. <b>Ghenciu Ion</b>, G.Ț. „Ghenciu Ion Tudor”, conducător, IDNO/IDNP: 34983448" />
              <AnimatedText text="15. <b>Juganari Vitalie</b>, G.Ț. „Juganari Vitalie Ion”, conducător, IDNO/IDNP: 34829445" />
            </div>
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="16. <b>Cojocaru Nadejda</b>, Î.I. „Cojocari Ion”, angajată, IDNO/IDNP: 1003605150881" />
              <AnimatedText text="17. <b>Jaloba Larisa</b>, Î.I. „CRIZANTEMĂ-JALOBA”, administrator, IDNO/IDNP: 1005605000980" />
              <AnimatedText text="18. <b>Spînu Tatiana</b>, Î.I. „Spînu Valeriu”, administrator, IDNO/IDNP: 1003605151224" />
              <AnimatedText text="19. <b>Munteanu Andrei</b>, SRL „Alexpromun”, administrator, IDNO/IDNP: 1007605001877" />
              <AnimatedText text="20. <b>Grițcan Cristina</b>, SRL „Alun Iacobaș”, merceolog, IDNO/IDNP: 1014608001155" />
              <AnimatedText text="21. <b>Talmaci Mircea</b>, SRL „Agrocimtal”, administrator, IDNO/IDNP: 1017605002462" />
              <AnimatedText text="22. <b>Prodius Nicolae</b>, SRL „Rodinic-Service”, administrator, IDNO/IDNP: 1004605006619" />
              <AnimatedText text="23. <b>Sturza Elena</b>, SRL „UNIVECAS”, administrator, IDNO/IDNP: 1014605002520" />
              <AnimatedText text="24. <b>Țurcanu Oxana</b>, AO „Baștina”, administrator, IDNO/IDNP: 1020620007396" />
              <AnimatedText text="25. <b>Traci Pelaghia</b>, AO „Plai Natal”, membru AO, IDNO/IDNP: 1017620004016" />
              <AnimatedText text="26. <b>Onu Maria</b>, AO „Pro Ecaterinovca”, administrator, IDNO/IDNP: 1021620000877" />
              <AnimatedText text="27. <b>Botea Inga</b>, AO „Renaștere”, contabil, IDNO/IDNP: 1020620008441" />
              <AnimatedText text="28. <b>Harati Lilia</b>, AO „Struguraș”, membră AO, IDNO/IDNP: 1021620001427" />
              <AnimatedText text="29. <b>Melnic Victoria</b>, AO „Speranța Viitorului”, administrator, IDNO/IDNP: 1021620004026" />
            </div>
          </div>
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Consiliul de Administrare"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText
              text="Registrul Membrilor Consiliului de Administrație"
              customStyles="font-bold col-span-3"
            />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="1. <b>Badan Tatiana</b>, Primăria satului Selemet, primar" />
              <AnimatedText text="2. <b>Cucereavâi Vladimir</b>, Primăria satului Taraclia, primar" />
              <AnimatedText text="3. <b>Harati Lilia</b>,  AO „Struguraș”, membră AO" />
              <AnimatedText text="4. <b>Pârlog Sergiu</b>,  Primăria satului Ciuflești, primar" />
              <AnimatedText text="5. <b>Talmaci Mircea</b>, SRL „Agrocimtal”, administrator" />
            </div>
          </div>
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Comitetul de Selectare"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText
              text="Registrul Membrilor Comitetului de Selectare"
              customStyles="font-bold col-span-3"
            />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="1. <b>Badan Tatiana</b>, Primăria satului Selemet, primar" />
              <AnimatedText text="2. Strogoteanu Efim, GȚ „Gaibu Serghei Fiodor”, angajat" />
              <AnimatedText text="3. Botea Inga,  A.O. „Renașterea”, contabil" />
              <AnimatedText text="4. Ghenciu Ion,  GȚ „Ghenciu Ion Tudor”, conducător" />
              <AnimatedText text="5. Spînu Valeriu, Primăria satului Codreni, primar" />
              <AnimatedText text="6. Melnic Victoria, A.O. „Speranța Viitorului”, administrator" />
              <AnimatedText text="7. Prodius Nicolae, SRL „Rodinic-Service”, administrator" />
            </div>
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="<b>Membri suplianți</b>" />
              <AnimatedText text="1. <b>Munteanu Andrei</b>, SRL „Alexpromun”, administrator" />
              <AnimatedText text="2. <b>Faureanu Iurie</b>,  Primăria satului Porumbrei, primar" />
              <AnimatedText text="3. <b>Onu Maria</b>,  A.O. „Pro Ecaterinovca”, administrator" />
            </div>
          </div>
          <div className="grid grid-cols-full w-full relative">
            <AnimatedHeader
              text="Comisia de Cenzori"
              customStyles="col-span-full text-5xl font-bold leading-13"
            />
            <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
            <AnimatedText
              text="Registrul Membrilor Comisiei de Cenzori"
              customStyles="font-bold col-span-3"
            />
            <div className="col-span-4 flex flex-col gap-4 mb-24">
              <AnimatedText text="1. <b>Ciobanu Svetlana</b>, Primăria comunei Ecaterinovca" />
              <AnimatedText text="2. <b>Traci Pelaghia</b>, A.O. „Plai Natal”" />
              <AnimatedText text="3. <b>Țurcanu Oxana</b>,  A.O. „Baștina”" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
