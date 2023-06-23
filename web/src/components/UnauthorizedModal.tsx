import Image from 'next/image';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';


import { Text } from '@/components/Text';
import { Heading } from '@/components/Heading';
import { LinkButton } from '@/components/LinkButton';

import DiscordIcon from '@/assets/dicord.svg'

interface UnauthorizedModalProps {
    title: string,
    content?: string,
}

export function UnauthorizedModal({ title, content }: UnauthorizedModalProps){
   
    useEffect(() => {
        const currentUrl = document.URL
        const redirectUrl = Cookies.get('redirectTo')
        if (redirectUrl !== currentUrl || redirectUrl === undefined) {
            Cookies.set('redirectTo', currentUrl, {
                path: '/',
            })
        }
    },[])

    return (
    <Dialog.Portal >
        <Dialog.Overlay className='w-screen h-screen bg-black/60 fixed inset-0 ' />

        <Dialog.Content
            className='
                max-w-[390px]
                w-[calc(100%-32px)]
                flex flex-col items-center
                gap-6
            
            fixed   bg-[#2A2634] py-6 px-6 shadow-lg shadow-black/25 
            rounded top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
          '
        >
            <Dialog.Close className='self-end flex'>
                    <X/>
            </Dialog.Close>

            <div >
                <Dialog.Title asChild>
                        <Heading  size='xl' className='text-center '>{title}</Heading>
                </Dialog.Title>
                <Text   className='break-wordsa font-medium block mt-2 text-center'>
                    {content}
                </Text>
            </div>
                <LinkButton
                    className='w-full'
                    href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_DISCORD_URI}`}
                >
                    <Image alt='icone do aplicativo discord' src={DiscordIcon} />
                    Entrar com Discord

                </LinkButton>
            
        </Dialog.Content>
    </Dialog.Portal>

    )
}