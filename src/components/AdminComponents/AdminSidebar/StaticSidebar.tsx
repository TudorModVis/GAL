import { ADMIN_SIDEBAR_ITEMS } from '@/constants/admin-sidebar.constants'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { SidebarSubsection } from './SidebarSubsection'

export function StaticSidebar() {

    return (
        <div className={`max-sidebar-req:hidden h-screen fixed top-0 left-0 z-[1000] border-r border-r-gray-500 bg-green-600 w-[16.625rem]`}>

            <div className='w-full h-full flex flex-col p-[1.5rem]'>
                <Link href='/admin'>
                    <Image
                        src='/admin_assets/logo-gal-white.svg'
                        alt='logo'
                        width={64}
                        height={64}
                        className='size-[4rem]'
                    />
                </Link>

                <div className='flex flex-col gap-[2rem] mt-[4rem]'>
                    {
                        ADMIN_SIDEBAR_ITEMS.map((subsection, index) => (
                            <SidebarSubsection key={index} {...subsection} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
