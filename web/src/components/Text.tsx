import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot'

import { ReactNode } from 'react';
export interface TextProps {
    size?: 'xs' | 'sm' | 'base' | 'base' | 'lg' |'xl',
    type?: 'primary' | 'secondary' | 'error'
    children: ReactNode,
    asChild?: boolean,
    className?: string
}

export function Text({ size = 'base', children, asChild,type='primary', className }: TextProps) {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp className={
            clsx(
                ' text-base',
                {
                    'text-sm': size === 'sm',
                    'text-xs': size === 'xs',
                    'text-lg': size === 'lg',
                    'text-xl': size === 'xl',
                    'text-white': type === 'primary',
                    'text-red-500': type === 'error',
                    'text-zinc-400': type === 'secondary'

                },
                className
            )

        }

        >
            {children}
        </Comp>
    )
}