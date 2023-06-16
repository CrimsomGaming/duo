import { ReactNode } from 'react';
import * as ToastRadix from '@radix-ui/react-toast';

import { Text } from '@/components/Text';
import { Heading } from '@/components/Heading';

interface ToastProps extends ToastRadix.ToastProps {
    title: string;
    description?: string | ReactNode;
}

export function Toast({title,description, ...rest} : ToastProps) {
    return (
            <ToastRadix.Provider  label="notificação" swipeDirection="right" >


                <ToastRadix.Root
                    className=" bg-[#3d374c] rounded-md px-4 py-6  data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                    {...rest}
                >
                    <ToastRadix.Title asChild>
                        <Heading size="lg" className="font-semibold" >
                           {title}
                        </Heading>

                    </ToastRadix.Title>

                    <ToastRadix.Description asChild>
                        <Text  >
                            {description}
                        </Text>
                    </ToastRadix.Description>

                </ToastRadix.Root>
                <ToastRadix.Viewport className="[--viewport-padding:_25px] fixed top-0  right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
            </ToastRadix.Provider>
    )
}