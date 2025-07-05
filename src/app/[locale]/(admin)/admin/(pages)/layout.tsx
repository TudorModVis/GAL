import type { PropsWithChildren } from 'react'

import { AdminNav } from '@/components/AdminComponents/AdminNav'
import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar'

export default function AdminPagesLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='px-[2rem] pb-[6rem] pt-[1.5rem]'>
			<AdminNav />
			<AdminSidebar />
			{children}
		</div>
	)
}
