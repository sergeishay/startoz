
'use client';
import { useState, useEffect, useRef } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom';


const ButtonSubmit = ({value, ...props}) => {
    const { pending } = useFormStatus()

  return (
    <div>
        <button disabled={pending} {...props} >
            {pending ? 'Loading...' : value}
        </button>

    </div>
  )
}

export default ButtonSubmit