import React from 'react'

interface CrossColor {
	color?: string
}

const Cross: React.FC<CrossColor> = props => {
	const strokeColor = props.color || '#11200B'
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8.0002 8L12.8002 12.8M8.0002 8L3.2002 3.2M8.0002 8L3.2002 12.8M8.0002 8L12.8002 3.2'
				stroke={strokeColor}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default Cross
