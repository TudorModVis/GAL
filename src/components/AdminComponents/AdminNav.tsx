"use client";

import Image from "next/image";
import { Button } from "./ui/Button";
import { LangSelectBox } from "./ui/SelectBox/LangSelectBox";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "@/i18n/navigation";


export function AdminNav() {

    const router = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            router.push('/admin/login')
        },
    })

	return <div className="flex items-center justify-between">
        <h1 className='font-bold text-[1.25rem] text-green-700 w-max'>Fac mai incolo titlul sa se schimbe</h1>
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
