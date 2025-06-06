import React from 'react'
import Link from 'next/link'
import Arrow from './Arrow'

interface LinkWithArrowProps {
  backgroundColor?: string;
  insideColor?: string;
  text?: string;
  fill?: string;
  href: string;
  style?: 'default' | 'split';
}

const LinkWithArrow: React.FC<LinkWithArrowProps> = (props) => {
  return (
    <Link style={{color: props.insideColor}} className={`group flex ${props.style === 'split' ? 'w-full justify-between' : 'w-fit gap-1'} leading-normal`} href={props.href}>
      <div className={`px-4 py-2.5 ${props.backgroundColor} rounded-full`}>{props.text}</div>
      <div className={`group-hover:rotate-45 transition ease-in ${props.backgroundColor} p-4 rounded-full self-center`}><Arrow fill={props.insideColor}/></div>
    </Link>
  )
}

export default LinkWithArrow