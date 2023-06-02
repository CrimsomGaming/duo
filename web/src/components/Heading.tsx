import clsx from "clsx"
import { ReactNode } from "react"
import { Slot } from '@radix-ui/react-slot';


export interface HeadingProps {
    children: ReactNode,
    size?: 'lg' | 'xl' | '2xl' | '3.5xl' | '6xl',
    asChild?: boolean,
    className?: string,
}



export function Heading({ children, size = '2xl', asChild, className, ...rest }: HeadingProps) {
    const Comp = asChild ? Slot : 'h2'

    return (
        <Comp {...rest} className={
            clsx('text-2xl leading-relaxed font-bold text-white', {
                'text-lg': size === 'lg',
                'text-xl': size === 'xl',
                'text-[2rem]': size === '3.5xl',
                'text-6xl': size === '6xl',
            },
                className

            )
        }>
            {children}
        </Comp>
    )
}