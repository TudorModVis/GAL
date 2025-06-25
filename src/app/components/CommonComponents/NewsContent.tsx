import React from "react";
import AnimatedLine from "./AnimatedLine";
import AnimatedText from "./AnimatedText";
import AnimatedHeader from "./AnimatedHeader";
import ParalaxImage from "./ParalaxImage";

const NewsContent = () => {
  return (
    <section className="w-screen h-fit grid grid-cols-full relative text-forest-900">
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text="Sumarul proiectului"
        customStyles="col-span-2 font-bold leading-4.5"
      />
      <AnimatedText
        text="ALNF’s Refugee Action Support program is an award-winning initiative designed to support children and young people from refugee backgrounds through individualised one-on-one tutoring, tailored to their unique needs. Recognising the multitude of challenges and complexities faced by young people from refugee backgrounds, the program creates safe learning spaces that enable students to develop their language, communication and classroom learning practices, facilitating a successful transition to Australian schooling and boosting students’ confidence.ALNF’s Refugee Action Support program is an award-winning initiative designed to support children and young people from refugee backgrounds through individualised one-on-one tutoring, tailored to their unique needs."
        customStyles="col-span-4 col-start-4 leading-4.5"
      />
      <AnimatedText
        text="Through its unique 3-way partnership between ALNF, the Department of Education and participating universities, the program also provides valuable opportunities for young teachers-in-training to gain vital first-hand classroom experience and build their capacity. The program has been recognised as an exemplary initiative by the Refugee Council of Australia, the Human Rights and Equal Opportunities Commission and the MacJanet Prize for Global Citizenship."
        customStyles="col-span-4 col-start-8 leading-4.5"
      />
      <AnimatedHeader
        text="The Living First Language Platform"
        customStyles="col-span-9 text-5xl leading-13 font-bold mb-12 mt-24"
      />
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text="Sumarul proiectului"
        customStyles="col-span-2 font-bold leading-4.5"
      />
      <AnimatedText
        text="The Living First Language Platform is a multi award-winning innovation that records, revitalises and celebrates Indigenous First Languages and turns them into dynamic, community-led and interactive digital literacy apps. In Australia, First Languages are disappearing at a faster rate than anywhere in the world despite a universal acknowledgment that Language plays a vital role in the health, wellbeing, education and future of Indigenous peoples. The Living First Language project harnesses technology in order to stem the tide of loss of First Languages and empower children to become learners in their Mother Tongues. ALNF’s technological solution offers a faster and more scalable means to efficiently and effectively capture and share languages"
        customStyles="col-span-4 col-start-4 leading-4.5"
      />
      <AnimatedText
        text="Through its unique 3-way partnership between ALNF, the Department of Education and participating universities, the program also provides valuable opportunities for young teachers-in-training to gain vital first-hand classroom experience and build their capacity. The program has been recognised as an exemplary initiative by the Refugee Council of Australia, the Human Rights and Equal Opportunities Commission and the MacJanet Prize for Global Citizenship."
        customStyles="col-span-4 col-start-8 leading-4.5"
      />
      <AnimatedLine customStyles="col-span-full mb-2 mt-12" />
      <AnimatedText
        text="Awards & Global Recognition"
        customStyles="col-span-2 font-bold leading-4.5"
      />
      <AnimatedText
        text="The Living First Language Platform is a multi award-winning innovation that records, revitalises and celebrates Indigenous First Languages and turns them into dynamic, community-led and interactive digital literacy apps. In Australia, First Languages are disappearing at a faster rate than anywhere in the world despite a universal acknowledgment that Language plays a vital role in the health, wellbeing, education and future of Indigenous peoples. The Living First Language project harnesses technology in order to stem the tide of loss of First Languages and empower children to become learners in their Mother Tongues. ALNF’s technological solution offers a faster and more scalable means to efficiently and effectively capture and share languages"
        customStyles="col-span-4 col-start-4 leading-4.5"
      />
      <AnimatedHeader
        text="Coding Aboriginal Languages for Indigenous Literacy (CALIL)"
        customStyles="col-span-9 text-5xl leading-13 font-bold mb-12 mt-24"
      />
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text="What is it?"
        customStyles="col-span-2 font-bold leading-4.5"
      />
      <AnimatedText
        text="At the heart of the CALIL Program is the nationally accredited 10756NAT Certificate III in Coding Aboriginal Languages for Indigenous Literacy training course (delivered by ALNF through Ninti Training Limited (NTL), RTO 70018). The Program equips community participants with the skills to collect, categorise and convert oral First Language elements into effective reading and writing resources. To develop and refine the CALIL process, ALNF collaborates with Indigenous Elders who indicate the correct pronunciation of letter strings and words. To facilitate quick and accurate print pronunciation representation whilst reading, ALNF and CALIL participants devise an accurate reading code for the local language(s)."
        customStyles="col-span-4 col-start-4 leading-4.5"
      />
      <AnimatedText
        text="By converting oral First Languages into reading and writing courses, ALNF and local communities can provide community members with the teaching and learning skills and strategies that empower them to teach their own children to read and write in their First Languages. Literacy in First Language(s) can also help children by giving them the skills to make comparisons and contrasts with English language and literacy."
        customStyles="col-span-4 col-start-8 leading-4.5"
      />
      <div className="w-[1448px] h-[64vh] overflow-hidden mt-24 rounded-2xl mb-40 col-span-full">
        <ParalaxImage altText="test" source="/donation_image.png" />
      </div>
      <AnimatedHeader
        text="Early Language & Literacy Developmental Index (ELLDI)"
        customStyles="col-span-9 text-5xl leading-13 font-bold mb-12"
      />
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text="Key features of the ELLDI"
        customStyles="col-span-2 font-bold leading-4.5"
      />
      <AnimatedText
        text={`
          Administration – Conducting ELLDI interviews 
          <ul class="list-disc pl-6">
            <li>
              Seven sub-domains are assessed:
              <ol class="list-[lower-alpha] pl-6">
                <li>Expressive Vocabulary</li>
                <li>Phonological Awareness</li>
                <li>Comprehension</li>
                <li>Oral Language – including Clarity, Volume and Fluency</li>
                <li>Print Conventions</li>
                <li>Reading</li>
              </ol> 
            </li>
            <li>Administration of the digital ELLDI takes approximately 20-30 minutes</li>
            <li>An ever-growing database of assessment items has been established so various assessment sets (9 are currently available) can be administered to monitor children’s growth across time.</li>
          </ul>
          The digital ELLDI has been developed to support scaling, collaboration and efficiencies.
        `}
        customStyles="col-span-4 col-start-4 leading-4.5"
      />
      <AnimatedText
        text="By converting oral First Languages into reading and writing courses, ALNF and local communities can provide community members with the teaching and learning skills and strategies that empower them to teach their own children to read and write in their First Languages. Literacy in First Language(s) can also help children by giving them the skills to make comparisons and contrasts with English language and literacy."
        customStyles="col-span-4 col-start-8 leading-4.5"
      />
      <div className="w-[1448px] h-[64vh] overflow-hidden rounded-2xl mb-40 col-span-full mt-24">
        <ParalaxImage altText="test" source="/donation_image.png" />
      </div>
    </section>
  );
};

export default NewsContent;
