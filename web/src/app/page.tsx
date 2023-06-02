import Link from 'next/link'
import Image from 'next/image'
import {User} from 'lucide-react'

import DiscordIcon from '@/assets/dicord.svg'
import { Heading } from '@/components/Heading'
import { LinkButton } from '@/components/LinkButton'


export default function Home() {
  return (
    <div className='grid grid-cols-2 items-center h-screen '>
      <aside className='flex-1 flex justify-center'>
          <Heading asChild size='3.5xl'>
            <h1>Conecte-se com jogadores
              <span className='block'>apaixonados ao</span>
              <span className='block'>redor do mundo</span>
            
            </h1>
          </Heading>
      </aside>
    
        <main className='w-full max-w-[328px] flex flex-col mx-auto '>
        <Heading size='xl' className='font-bold text-center '>Encontre sue <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span></Heading>
          <div className='flex flex-col gap-4 mt-5'>
            <LinkButton 
            className='w-full'
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify`}
            >
              <Image alt='icone do aplicativo discord' src={DiscordIcon}/>
              Entrar com Discord
            
            </LinkButton>

            <LinkButton
              variant='secondary'
              asChild
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify`}
            >
              <Link href={'/home'}>
                <User height={20} width={20} />Entra como convidado

              </Link>
            </LinkButton>
          </div>

        </main>  
    </div>
  )
}
