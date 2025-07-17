import React from 'react'

interface customStyles {
  customStyles?: string
}

const ImageIcon: React.FC<customStyles> = props => {
	return (
		<svg
			width='260'
			height='260'
			className={`${props.customStyles}`}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M3 14V5H21V19H3V14Z'
				stroke='#D1D5DC'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M3 16L7 13L10 15L16 10L21 14'
				stroke='#D1D5DC'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z'
				fill='#D1D5DC'
			/>
			<path
				d='M3 16L7 13L10 15L16 10L21 14V19H3V16Z'
				fill='#D1D5DC'
			/>
		</svg>
	)
}

export default ImageIcon
