import { Text } from '@/components/Text'
import { Annoyed } from 'lucide-react'
import Link from 'next/link'

export function EmptyAnnouncements(){
    return (
        <div className=' flex flex-col mt-8 gap-4  items-center max-w-[472px] mx-auto max-md:flex-grow max-sm:mt-8'>
            <Annoyed  size={32}/>
            <Text size='xl' className=''  asChild>
                    <p className='text-center'>
                        ainda não existe nenhum  anuncio  para este game. 
                       Seja o primerio a  <Link href='/home' className='text-violet-500 underline ' >criar</Link> um  annuncio 
                    </p>

            </Text>
        </div>
    )
}