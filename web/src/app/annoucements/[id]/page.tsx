import { Heading } from "@/components/Heading"
import { Text } from "@/components/Text"
import Image from "next/image"
import { api } from "@/libs/api";
import { AnnoucementsCarrousel } from "../components/AnnoucementsCarrouesel"
import { ANNOUCEMENT_DTO } from "@/DTO/ANNOUCEMENTS_DTO"
import { cookies } from "next/headers";
import { getUser } from "@/libs/auth";

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
   
    
    const response = await api.get<gameResponse>(`/games/${id}`,{
        headers: {
           Authorization: `Bearer ${user?.sub}`
        }
    })
   

    

    const { game, announcements } = response.data
    
   

    return (
        <div className="max-w-[1440px] px-4 py-4 mx-auto gap-6  min-h-screen flex flex-col justify-center ">
            <Image
                src={game.banner}
                alt=""
                width={1344}
                loading="lazy"
                height={300}
                className="h-[18.75rem] object-cover rounded w-full "
                
            />
            <div className="text-center">
                <Heading size="3.5xl">{game.name}</Heading>
                <Text type="secondary">Está na hora de encontrar o seu duo {user?.username}</Text>
            </div>

            <AnnoucementsCarrousel annoucements={announcements}/>

        </div>
    )
}