import 'keen-slider/keen-slider.min.css'

import { Heading } from '@/components/Heading'
import { GamesCarousell } from '@/components/GamesCarrousel'
import { CreateAdBanner } from '@/components/CreateAdBanner'

import { games } from '@/utils/games'




export default function Home() {
    return (
        <div className="max-w-[1424px] px-10 mx-auto flex flex-col items-center  min-h-screen justify-center max-sm:px-0">

            <Heading size='6xl' className='max-md:text-4xl'  asChild>
                <h1 >
                    Seu <span className="text-transparent  bg-nlw-gradient bg-clip-text">duo</span> está aqui.
                </h1>

            </Heading>

            <div className='w-full mt-14'>
                <GamesCarousell games={games} />
            </div>
            
            <div className='mt-10 w-full'>
                <CreateAdBanner />
            </div>


        </div>
    )
} 