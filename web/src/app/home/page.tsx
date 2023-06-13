import 'keen-slider/keen-slider.min.css'

import { Heading } from '@/components/Heading'
import { GamesCarousell } from '@/app/home/components/GamesCarrousel'
import { CreateAdBanner } from '@/app/home/components/CreateAdBanner'

import { api } from '@/libs/api'
import { GAME_DTO } from '@/DTO/GAME_DTO'
import { getUser } from '@/libs/auth'
import { Metadata } from 'next'

export const revalidate = 60 * 2 // 2 minutes

export const metadata: Metadata = {
    title:'Home'
}

export default async function Home() {
    const user = getUser()
    const userIsLoged = !!user
    

    async function fetchGames(){
        if (!userIsLoged){
            const response = await api.get<GAME_DTO[]>('/games',)
            return  response.data
        }
        
        const response = await api.get<GAME_DTO[]>('/games', {
            headers: {
                Authorization: `Bearer ${user?.sub} `
            }
        })

        return response.data
        
    }

    const games = await fetchGames()

    return (
        <div className="max-w-[1424px] px-10 mx-auto flex flex-col items-center  min-h-screen justify-center max-sm:px-0">

            <Heading size='6xl' className='max-md:text-4xl'  asChild>
                <h1 >
                    Seu <span className="text-transparent  bg-nlw-gradient bg-clip-text">Duo</span> está aqui.
                </h1>

            </Heading>

            <div className='w-full mt-14'>
                <GamesCarousell games={games}  />
            </div>
            
            <div className='mt-10 w-full'>
                <CreateAdBanner  />
            </div>


        </div>
    )
} 