'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Arrow from '../CommonComponents/Arrow'
import Logo from '../CommonComponents/Logo'

import ArrowDown from './ArrowDown'
import LanguageSwitcher from './LanguageSwitcher'
import MagnifyGlass from './MagnifyGlass'
import SearchMobile from './SearchMobile'
import { useScrollLock } from './useScrollLock'
import { Link, usePathname } from '@/i18n/navigation'

interface NavProps {
	isFixed?: boolean
}

const NavBar: React.FC<NavProps> = ({ isFixed }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
	const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false)
	const [isAuthenticOpen, setIsAuthenticOpen] = useState<boolean>(false)
	const [mounted, setMounted] = useState<boolean>(false)
	const { lock, unlock } = useScrollLock()

	const pathname = usePathname()
	const tNav = useTranslations('index.NavBar')
	const closeMenuTimer = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		setMounted(true)

		return () => {
			if (closeMenuTimer.current) {
				clearTimeout(closeMenuTimer.current)
			}
		}
	}, [])

	const handleScrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth'
		})
		setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen || isSearchOpen) {
			lock()
		} else {
			unlock()
		}
	}, [isOpen, isSearchOpen, lock, unlock])

	const toggleSearch = () => {
		setIsSearchOpen(prev => {
			if (!prev) setIsOpen(false)
			return !prev
		})
	}

	const toggleMenu = () => {
		setIsOpen(prev => {
			if (!prev) setIsSearchOpen(false)
			return !prev
		})
	}

	const topVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: 45, translateY: 5 }
	}

	const middleVariants = {
		closed: { opacity: 1 },
		open: { opacity: 0 }
	}

	const bottomVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: -45, translateY: -5 }
	}

	const menuVariants = {
		open: {
			y: 0,
			transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
		},
		closed: {
			y: '-100%',
			transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
		}
	}

	const itemVariants = {
		open: {
			opacity: 1,
			transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
		},
		closed: {
			opacity: 0
		}
	}

	const subMenuVariants = {
		open: {
			opacity: 1,
			height: 'auto',
			marginTop: '10px',
			transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
		},
		closed: {
			opacity: 0,
			height: 0,
			marginTop: '0px',
			transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
		}
	}

	return (
		<>
			{mounted &&
				createPortal(
					<motion.div
						className='fixed top-0 left-0 right-0 w-screen h-full bg-stone-50 text-forest-900 z-10 flex overflow-y-auto'
						initial={false}
						animate={isSearchOpen ? 'open' : 'closed'}
						variants={menuVariants}
					>
						<SearchMobile isOpen={isSearchOpen} />
					</motion.div>,
					document.body
				)}
			{mounted &&
				createPortal(
					<motion.div
						className='fixed top-0 left-0 right-0 w-screen h-full bg-stone-50 text-forest-900 z-10 flex overflow-y-auto'
						initial={false}
						animate={isOpen ? 'open' : 'closed'}
						variants={menuVariants}
					>
						<ul
							className={`flex flex-col text-2xl list-none! ${isAuthenticOpen ? '[&>li:not(:nth-child(5))]:text-stone-400' : ''} ${isAboutOpen ? '[&>li:not(:nth-child(2))]:text-stone-400' : ''} [&>li]:transition [&>li]:duration-500 w-full px-5.5 mt-32`}
						>
							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<Link
									className='w-full flex items-center justify-between'
									href='/'
									onClick={() => setIsOpen(false)}
								>
									<span>{tNav('home')}</span>
									<span
										className={`size-7 ${pathname == '/' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
									>
										<Arrow arrowCustomStyle='fill-sand-50 size-3' />
									</span>
								</Link>
							</motion.li>

							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<button
									className='w-full flex items-center justify-between'
									onClick={() => {
										setIsAboutOpen(!isAboutOpen)
										setIsAuthenticOpen(false)
									}}
								>
									<span>{tNav('about.about_btn')}</span>
									<motion.span
										className='size-7 flex items-center justify-center rounded-full'
										animate={{ rotate: isAboutOpen ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<ArrowDown
											direction='w-3'
											arrowColor='#11200B'
										/>
									</motion.span>
								</button>
								<motion.ul
									initial={false}
									animate={isAboutOpen ? 'open' : 'closed'}
									variants={subMenuVariants}
									className='pl-4 overflow-hidden'
								>
									<li className='pb-2 pt-6'>
										<Link
											href='/aboutUs'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('about.about_us')}</span>
											<span
												className={`size-7 ${pathname == '/aboutUs' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
									<li className='py-2'>
										<Link
											href='/administration'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('about.management')}</span>
											<span
												className={`size-7 ${pathname == '/administration' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
									<li className='py-2'>
										<Link
											href='/documents'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('about.documents')}</span>
											<span
												className={`size-7 ${pathname == '/documents' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
								</motion.ul>
							</motion.li>

							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<Link
									className='w-full flex items-center justify-between'
									href='/news'
									onClick={() => setIsOpen(false)}
								>
									<span>{tNav('news')}</span>
									<span
										className={`size-7 ${pathname == '/news' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
									>
										<Arrow arrowCustomStyle='fill-sand-50 size-3' />
									</span>
								</Link>
							</motion.li>

							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<Link
									className='w-full flex items-center justify-between'
									href='/projects'
									onClick={() => setIsOpen(false)}
								>
									<span>{tNav('projects')}</span>
									<span
										className={`size-7 ${pathname == '/projects' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
									>
										<Arrow arrowCustomStyle='fill-sand-50 size-3' />
									</span>
								</Link>
							</motion.li>

							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<button
									className='w-full flex items-center justify-between'
									onClick={() => {
										setIsAuthenticOpen(!isAuthenticOpen)
										setIsAboutOpen(false)
									}}
								>
									<span>{tNav('authentic_local.authentic_btn')}</span>
									<motion.span
										className='size-7 flex items-center justify-center rounded-full'
										animate={{ rotate: isAuthenticOpen ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<ArrowDown
											direction='w-3'
											arrowColor='#11200B'
										/>
									</motion.span>
								</button>
								<motion.ul
									initial={false}
									animate={isAuthenticOpen ? 'open' : 'closed'}
									variants={subMenuVariants}
									className='pl-4 overflow-hidden'
								>
									<li className='pb-2 pt-6'>
										<Link
											href='/authentic-local/local-products'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('authentic_local.local_products')}</span>
											<span
												className={`size-7 ${pathname == '/authentic-local/local-products' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
									<li className='py-2'>
										<Link
											href='/authentic-local/services'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('authentic_local.community_services')}</span>
											<span
												className={`size-7 ${pathname == '/authentic-local/services' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
									<li className='py-2'>
										<Link
											href='/authentic-local/tourist-attractions'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('authentic_local.tourist_attractions')}</span>
											<span
												className={`size-7 ${pathname == '/authentic-local/tourist-attractions' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
									<li className='py-2'>
										<Link
											href='/authentic-local/people-and-values'
											className='w-full flex items-center justify-between'
											onClick={() => setIsOpen(false)}
										>
											<span>{tNav('authentic_local.people_and_values')}</span>
											<span
												className={`size-7 ${pathname == '/authentic-local/people-and-values' ? 'bg-forest-800' : ''} flex items-center justify-center rounded-full`}
											>
												<Arrow arrowCustomStyle='fill-sand-50 size-3' />
											</span>
										</Link>
									</li>
								</motion.ul>
							</motion.li>

							<motion.li
								variants={itemVariants}
								className='border-b-[1px] border-stone-400 py-2.5 px-2'
							>
								<button
									onClick={handleScrollToBottom}
									className='w-full flex items-center justify-between cursor-pointer'
								>
									<span>{tNav('contacts')}</span>
								</button>
							</motion.li>
						</ul>
					</motion.div>,
					document.body
				)}

			<div
				className={`text-nowrap border-b-[1px] ${
					isOpen || isFixed || isSearchOpen ? 'border-stone-400' : 'border-stone-50'
				} duration-500 transition text-forest-900 z-10 top-0 left-0 right-0 w-screen min-[860px]:hidden`}
			>
				<div className='relative col-span-full grid-cols-full px-4 mx-auto flex items-center h-16'>
					<motion.button
						onClick={toggleSearch}
						animate={isSearchOpen ? 'open' : 'closed'}
						initial={false}
						className='relative size-10 rounded-full bg-forest-800 flex items-center justify-center overflow-hidden'
					>
						<motion.span
							variants={{
								closed: { opacity: 1, scale: 1, rotate: 0 },
								open: { opacity: 0, scale: 0.5, rotate: 90 }
							}}
							transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
							className='flex items-center justify-center'
						>
							<MagnifyGlass />
						</motion.span>

						<motion.span
							variants={{
								closed: { opacity: 0, scale: 0.5, rotate: -90 },
								open: { opacity: 1, scale: 1, rotate: 0 }
							}}
							transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
							className='absolute inset-0 flex items-center justify-center'
						>
							<motion.div
								variants={{
									closed: { rotate: 0, y: 0 },
									open: { rotate: 45, y: 0 }
								}}
								transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
								className='absolute w-4 h-0.5 bg-sand-50'
							/>
							<motion.div
								variants={{
									closed: { rotate: 0, y: 0 },
									open: { rotate: -45, y: 0 }
								}}
								transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
								className='absolute w-4 h-0.5 bg-sand-50'
							/>
						</motion.span>
					</motion.button>
					<Link
						href='/'
						className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
					>
						<Logo color='#254119' />
					</Link>

					<div className='flex gap-4 ml-auto'>
						<LanguageSwitcher
							arrowColor={isOpen || isFixed || isSearchOpen ? '#11200B' : '#FFFEFD'}
						/>

						<motion.button
							onClick={toggleMenu}
							animate={isOpen ? 'open' : 'closed'}
							initial={false}
							className='size-10 bg-forest-800 [&>div]:bg-stone-50 [&>div]:origin-center justify-center items-center rounded-full flex flex-col gap-[3px]'
						>
							<motion.div
								variants={topVariants}
								className='w-4 h-0.5'
							></motion.div>
							<motion.div
								variants={middleVariants}
								className='w-4 h-0.5'
							></motion.div>
							<motion.div
								variants={bottomVariants}
								className='w-4 h-0.5'
							></motion.div>
						</motion.button>
					</div>
				</div>
			</div>
		</>
	)
}

export default NavBar
