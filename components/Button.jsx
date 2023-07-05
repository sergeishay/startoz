import React from 'react'
import Link from 'next/link'



const Button = ({color, link, text}) => {
  return (
    <div>
        <Link href={link}>
            <button className={` text-primary-gray hover:text-primary-turkiz font-500 pt-2 px-4 rounded-full`}>
                {text}
            </button>
        </Link>
    </div>
  )
}

export default Button