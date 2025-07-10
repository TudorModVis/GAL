import React from "react";
import { useTranslations } from "next-intl";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";

const ContactForm = () => {
  const tFooter = useTranslations("index.Footer");

  return (
    <>
      <div className="col-span-full">
        <h4 className="font-bold">
          {tFooter("form_text.how_can_we_help_header")}
        </h4>
        <div
          className="flex flex-wrap gap-2 sm:gap-4 mt-4 mb-6 [&>*]:bg-sand-50 [&>*]:cursor-pointer
                      [&>*]:text-black [&>*]:rounded-full [&>*]:font-medium
                        [&>*]:hover:bg-stone-200 [&>*]:transition 
                        [&>*]:active:bg-forest-800
                        sm:[&>*]:px-4 [&>*]:px-3.5 [&>*]:py-2.5"
        >
          <button>{tFooter("form_text.donation_button")}</button>
          <button>{tFooter("form_text.consultation_button")}</button>
          <button>{tFooter("form_text.collaboration_button")}</button>
          <button className="">{tFooter("form_text.different_topic_button")}</button>
        </div>
      </div>
      <h4 className="font-bold col-span-full sm:mb-0 mb-6">
        {tFooter("form_text.personal_data_header")}
      </h4>
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0 sm:mb-0 mb-2"
        placeholder={tFooter("form_text.name_placeholder")}
        type="text"
        name="name"
        id="name"
      />
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0 sm:mb-0 mb-2"
        placeholder="Email"
        type="email"
        name="email"
        id="Email"
      />
      <input
        className="col-span-3 px-2 py-2.5 border-b-[1px] border-[#6F915E] outline-0 sm:mb-0 mb-2"
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
        <LinkWithArrow
          text={tFooter("form_text.contact_button_text")}
          href="/"
          arrowProps="group-hover/link:rotate-0 -rotate-45 fill-forest-900"
          customStyle="flex gap-1 mx-auto w-full items-center [&>div:nth-child(1)]:py-2.5
                         [&>div:nth-child(1)]:px-4 [&>div]:text-forest-900 [&>div]:bg-sand-50 [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
    </>
  );
};

export default ContactForm;
