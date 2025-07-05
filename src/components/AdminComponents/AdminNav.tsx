import Image from "next/image";
import { Button } from "./ui/Button";
import { LangSelectBox } from "./ui/SelectBox/LangSelectBox";


export function AdminNav() {
	return <div className="flex items-center justify-end gap-[1.5rem]">
        <LangSelectBox />
        <Button className="size-[2.5rem] flex items-center justify-center cursor-pointer">
            <Image 
                src={"/admin_assets/search-icon.svg"}
                alt="Search Icon"
                width={16}
                height={16}
                className="size-[1rem]"
            />
        </Button>
        <Button className="h-[2.5rem] w-fit flex items-center justify-center cursor-pointer px-[1rem] text-[1rem] font-[400]">
            Log out
        </Button>
    </div>
}
