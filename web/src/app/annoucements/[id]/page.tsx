import { Heading } from "@/components/Heading"
import { Text } from "@/components/Text"
import Image from "next/image"
import { api } from "@/libs/api";
import { AnnoucementsCarrousel } from "../components/AnnoucementsCarrouesel"
import { ANNOUCEMENT_DTO } from "@/DTO/ANNOUCEMENTS_DTO"
import { getUser } from "@/libs/auth";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { serverSideApi } from "@/libs/serverSideApi";
;


export async function generateMetadata({ params }: AnnoucementsProps) {

    try {
        const response = await api.get<gameResponse>(`/games/${params.id}`)
        return {
            title: response.data.game.name 
        }
        
    } catch (error) {
        console.log(error)
    }
    return {
        title: ' jogo não encontrado'
    }

}

interface AnnoucementsProps {
    params: {
        id: string
    }
}


interface  gameResponse  {
    game: {
        id: 1,
        name: string,
        image: string
        ads_count: number,
        banner: string
    },
    announcements: ANNOUCEMENT_DTO[]
}


export default async function Annoucements({ params:{id}}: AnnoucementsProps){
    
    const user = getUser()
    const userIsLoged = !!user

    async function  fetchUser() {
        const  response =  await serverSideApi.get<gameResponse>(`/games/${id}`)
        return response.data
    }
    
   
    const { game, announcements } = await fetchUser()
    
   

    return (
        <div className="max-w-[1440px] px-4 py-4 mx-auto gap-6  min-h-screen flex flex-col justify-center ">
            <div className="relative">
                <Image
                    src={game.banner}
                    alt=""
                    width={1344}
                    loading="lazy"
                    height={300}
                    className="h-[18.75rem] object-cover rounded w-full "
                    
                />
                <Link href={'/home'} className="bg-black/30" title="voltar para tela de anterior">
                    <ChevronLeft  size={60} className="top-3 text-zinc-300 left-3 absolute"/>
                </Link>
            </div>
            <div className="text-center">
                <Heading size="3.5xl">{game.name}</Heading>
                <Text type="secondary">Está na hora de encontrar o seu duo {user?.username}</Text>
            </div>
            
            <AnnoucementsCarrousel userIsLogged={userIsLoged} annoucements={announcements}/>

        </div>
    )
}