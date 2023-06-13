'use client' // Error components must be Client Components

import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import Link from 'next/link'
import { useEffect } from 'react'
import {Frown} from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
 
    return (
        <div className='min-h-screen flex justify-center items-center flex-col gap-6'>
            <Heading className='flex items-center gap-2' asChild>
                <h1>
                    Infelizmente Não Consegui encontrar este Jogo <Frown  strokeWidth={2}/>

                </h1>
            </Heading>
            <Text className='text-xl'>
                Que tal tentar <Link href={'/home'}
                    className='underline'
                
                >Encontrar</Link> outro Jogo
            </Text>
        </div>
    )
}