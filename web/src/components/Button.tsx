

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    variant?: 'primary'|  'secundary',
    customClass?:  string,

}

export  function Button({children,variant='primary',customClass,className, ...rest}: ButtonProps){
    return (
        <button 
            className={clsx(`w-full rounded-md gap-3 px-4 py-3 flex justify-center items-center bg-violet-500  hover:bg-violet-600 hover:text-white font-medium disabled:bg-violet-800 disabled:cursor-not-allowed`, {

                'bg-zinc-500 hover:bg-zinc-600': variant ==='secundary'

            },className)}
            {...rest}
        >
            {children}
        </button>
    )
}