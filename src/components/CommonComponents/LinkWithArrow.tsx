import React, { ComponentProps } from 'react'

import Arrow from './Arrow'
import { Link } from '@/i18n/navigation'

interface ArrowProps {
	asBtn?: boolean
	href: ComponentProps<typeof Link>['href']
	text: string
	customStyle?: string
	arrowProps?: string
	onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
	onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const LinkWithArrow: React.FC<ArrowProps> = props => {
	return !props.asBtn ? (
		<Link
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
			href={props.href}
			className={`${props.customStyle} group/link text-forest-900`}
		>
			<div className='transition duration-250 text-nowrap'>{props.text}</div>
			<div className='flex justify-center items-center transition'>
				<Arrow arrowCustomStyle={props.arrowProps} />
			</div>
		</Link>
	) : (
		<button className={`${props.customStyle} group/link text-forest-900 cursor-pointer`}>
			<div className='transition duration-250 text-nowrap'>{props.text}</div>
			<div className='flex justify-center items-center transition'>
				<Arrow arrowCustomStyle={props.arrowProps} />
			</div>
		</button>
	)
}

export default LinkWithArrow
