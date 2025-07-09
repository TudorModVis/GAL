"use client";

import Image from "next/image";
import { Button } from "./ui/Button";
import { LangSelectBox } from "./ui/SelectBox/LangSelectBox";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "@/i18n/navigation";
import { usePageTitle } from "@/hooks/admin/usePageTitle";


export function AdminNav() {

    const router = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            router.push('/admin/login')
        },
    })

    const { pageTitle, pageSlug, isSlugLoading } = usePageTitle()

	return <div className="flex items-center justify-between">
        {pageSlug !== '' || isSlugLoading ? (
            <div className="flex items-center gap-[0.25rem]">
                <h1 className='text-[1rem] leading-[1.125rem] font-[400] text-gray-600'>{pageTitle}</h1>
                <Image 
                    src={"/admin_assets/tiny-arrow-right-icon.svg"}
                    alt="Arrow Right Icon"
                    width={16}
                    height={16}
                    className="size-[1rem] text-gray-600"
                    draggable={false}
                />
                <h2 className='text-[1rem] leading-[1.125rem] font-[400] text-green-700'>{pageSlug}</h2>
            </div>
        ) : (
            <h1 className='font-bold text-[1.25rem] text-green-700 w-max'>{pageTitle}</h1>
        )}
        <div className="flex items-center gap-[1.5rem]">
            <LangSelectBox />
            <Button className="size-[2.5rem] flex items-center justify-center cursor-pointer">
                <Image 
                    src={"/admin_assets/search-icon.svg"}
                    alt="Search Icon"
                    width={16}
                    height={16}
                    className="size-[1rem]"
                    draggable={false}
                />
            </Button>
            <Button onClick={() => mutate()} className="h-[2.5rem] w-fit flex items-center justify-center cursor-pointer px-[1rem] text-[1rem] font-[400]">
                Log out
            </Button>
        </div>
    </div>
}
