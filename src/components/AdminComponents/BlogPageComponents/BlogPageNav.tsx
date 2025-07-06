
import { Button } from "../ui/Button";
import { LangBtn } from "./LangBtn";

interface Props {
    language: 'ro' | 'ru' | 'en';
    setLanguage: (lang: 'ro' | 'ru' | 'en') => void;
}

export function BlogPageNav({ language, setLanguage }: Props) {
	return (
		<div className='flex items-center justify-between pb-[1.5rem] relative'>
            <div className="absolute h-[1px] w-screen bg-gray-500 bottom-0 left-1/2 -translate-x-1/2"/>
			<div className='flex items-center'>
				<LangBtn
					text='Română'
					isActive={language === 'ro'}
					onClick={() => setLanguage('ro')}
				/>

				<LangBtn
					text='English'
					isActive={language === 'en'}
					onClick={() => setLanguage('en')}
				/>

				<LangBtn
					text='Русский'
					isActive={language === 'ru'}
					onClick={() => setLanguage('ru')}
				/>
			</div>
			<div className='flex items-center gap-[2.5rem]'>
				<p className='text-error text-[1rem] leading-[1.125rem] font-[400] cursor-pointer hover:opacity-70 transition-opacity duration-300'>
					Delete page
				</p>
				<Button className='w-fit px-[1rem] h-[2.5rem]'>
					<span className='text-[1rem] leading-[1.125rem] font-[500]'>Save blog</span>
				</Button>
			</div>
		</div>
	)
}
