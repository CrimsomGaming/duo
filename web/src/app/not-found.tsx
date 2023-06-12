
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import Link from 'next/link'
import { useEffect } from 'react'
import { Frown } from 'lucide-react'

export default function NotFound(){
    return (
        <div className='min-h-screen flex justify-center items-center flex-col gap-6'>
            <Heading className='flex items-center gap-2' asChild>
                <h1>
                    Falha ao encontrar a página 😭😭 (error 404)
                </h1>
            </Heading>
            <Text className='text-xl'>
                Que tal tentar  <Link href={'/home'}
                    className='underline font-medium'

                >Voltar</Link> para a tela de jogos ?
            </Text>
        </div>
    )
}