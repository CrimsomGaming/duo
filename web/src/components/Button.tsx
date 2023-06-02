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
            className={clsx(`w-full rounded-md gap-3 px-4 py-3 flex justify-center bg-slate-200`, {
                'bg-violet-500': variant === 'primary',

            },className)}
            {...rest}
        >
            {children}
        </button>
    )
}