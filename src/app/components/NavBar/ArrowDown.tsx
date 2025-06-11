import React from 'react'

interface ArrowColor{
  arrowColor?: string;
}

const ArrowDown: React.FC<ArrowColor> = ({arrowColor = "#FFFEFD"}) => {
  return (
    <svg className='transition' width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_365_234)">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.29277 7.38911L1.63577 1.73211L3.04977 0.318115L7.99977 5.26812L12.9498 0.318115L14.3638 1.73212L8.70677 7.38911C8.51924 7.57659 8.26493 7.6819 7.99977 7.6819C7.7346 7.6819 7.4803 7.57659 7.29277 7.38911Z" fill={arrowColor}/>
      </g>
      <defs>
        <clipPath id="clip0_365_234">
        <rect width="8" height="16" fill="white" transform="translate(16) rotate(90)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ArrowDown