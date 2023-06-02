import clsx from "clsx";
import { Slot } from '@radix-ui/react-slot'
import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkButton extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'primary'| 'secondary',
    asChild?: boolean,
    children?: ReactNode,
    className?: string,

}

export function LinkButton({asChild,variant='primary',className,children, ...rest}: LinkButton){
    const Component =  asChild ? Slot : 'a'

    return (
        <Component
            className={clsx(`w-full bg-violet-500 text-base rounded-md gap-3 px-4 h-11 font-bold leading-relaxed flex items-center justify-center `, {
                'bg-zinc-500': variant === 'secondary',

            }, className)}
            {...rest}
        >
            {children}
        </Component>
    )
}