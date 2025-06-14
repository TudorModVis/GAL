import React from "react";
// import LinkWithArrow from "../LinkWithArrow";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const tFooter = useTranslations("index.Footer");

  return (
    <>
      <div className="col-span-full">
        <h4 className="font-bold">
          {tFooter("form_text.how_can_we_help_header")}
        </h4>
        <div
          className="flex gap-4 mt-4 mb-6 [&>*]:bg-sand-50 [&>*]:cursor-pointer
                      [&>*]:text-black [&>*]:rounded-full [&>*]:font-medium
                        [&>*]:hover:bg-forest-500 [&>*]:transition 
                        [&>*]:hover:text-sand-50 [&>*]:active:bg-forest-800
                        [&>*]:px-4 [&>*]:py-2.5"
        >
          <button>{tFooter("form_text.donation_button")}</button>
          <button>{tFooter("form_text.consultation_button")}</button>
          <button>{tFooter("form_text.collaboration_button")}</button>
          <button>{tFooter("form_text.different_topic_button")}</button>
        </div>
      </div>
      <h4 className="font-bold col-span-full">
        {tFooter("form_text.personal_data_header")}
      </h4>
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0"
        placeholder={tFooter("form_text.name_placeholder")}
        type="text"
        name="name"
        id="name"
      />
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0"
        placeholder="Email"
        type="email"
        name="email"
        id="Email"
      />
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0"
        placeholder={tFooter("form_text.surname_placeholder")}
        type="text"
        name="surname"
        id="surname"
      />
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0"
        placeholder={tFooter("form_text.telephone_placeholder")}
        type="tel"
        name="phone"
        id="phone"
      />

      <h4 className="font-bold col-span-full mt-6">
        {tFooter("form_text.message_header")}
      </h4>
      <textarea
        className="col-span-full border-b-[1px] border-[#6F915E] px-2 py-2.5 outline-0 resize-none mt-4"
        placeholder={tFooter("form_text.message_placeholder")}
        rows={3}
      ></textarea>
      <div className="col-span-full flex items-center my-4">
        <input
          type="checkbox"
          id="confirmation"
          name="confirmation"
          className='mr-2 w-3 h-3 shrink-0 appearance-none border-sand-50 cursor-pointer checked:bg-[url("/checkmark.svg")] transition border-[1px] rounded-xs checked:bg-center checked:bg-no-repeat '
        />
        <label className="text-xs" htmlFor="confirmation">
          {tFooter("form_text.checkmark_label")}
        </label>
      </div>
      <div className="col-span-full">
        {/* <LinkWithArrow
          backgroundColor="bg-sand-50"
          insideColor="#11200B"
          text={tFooter("form_text.contact_button_text")}
          href="/"
          style="default"
        /> */}
      </div>
    </>
  );
};

export default ContactForm;
