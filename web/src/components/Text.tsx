import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot'

import { ReactNode } from 'react';
export interface TextProps {
    size?: 'xs' | 'sm' | 'md'|  'base'
    type?: 'primary' | 'secondary'
    children: ReactNode,
    asChild?: boolean,
    className?: string
}

export function Text({ size = 'md', children, asChild,type='primary', className }: TextProps) {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp className={
            clsx(
                'text-white text-base',
                {
                    'text-sm': size === 'sm',
                    'text-md': size === 'md',
                    'text-xs': size === 'xs',
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