import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot'

import { ReactNode } from 'react';
export interface TextProps {
    size?: 'xs' | 'sm' | 'base'|  'base'
    type?: 'primary' | 'secondary'
    children: ReactNode,
    asChild?: boolean,
    className?: string
}

export function Text({ size = 'base', children, asChild,type='primary', className }: TextProps) {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp className={
            clsx(
                'text-white text-base',
                {
                    'text-sm': size === 'sm',
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