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
import { EmptyAnnouncements } from "../components/EmptyAnnouncements";
;
interface gameResponse {
    game: {
        id: 1,
        name: string,
        image: string
        ads_count: number,
        banner: string
    },
    announcements: ANNOUCEMENT_DTO[]
}

export async function generateMetadata({ params }: AnnoucementsProps) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}games/${params.id}`, {
            
            next: {
                revalidate: 60 * 60 * 24 * 90 // 90 days
            }
        })
        const data: gameResponse = await response.json()
        return {
            title: data.game.name 
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





export default async function Annoucements({ params:{id}}: AnnoucementsProps){
    
    const user = getUser()
    const userIsLoged = !!user

    async function  fetchUser() {
        const  response =  await serverSideApi.get<gameResponse>(`/games/${id}`)
        return response.data
    }
    
   
    const { game, announcements } = await fetchUser()
    
   

    return (
        <div className="max-w-[1440px] w-full  box-border mx-auto py-4 px-4  gap-6  min-h-screen flex flex-col justify-center max-sm:justify-start max-sm:pt-28">
            <header className="relative ">
                <Image
                    src={game.banner}
                    alt={`imagem ilustrativa do jogo ${game.name}`}
                    quality={50}
                    
                    
                    width={1344}
                    height={300}

                    placeholder="blur"

                    blurDataURL="data:image/webp;base64,UklGRsIDAABXRUJQVlA4WAoAAAAgAAAARAEAjQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg1AEAAJASAJ0BKkUBjgA+bTaWSaQioaEgKHCADYlpbt30zL/ye8Pl/iAFrDKMUajUSvgpbtXNol0y7f8HVZM52Rt21Zdjzcmez3P/R0Xm1gS9hemxCi7XePCeh3t8Hw0qp23e6t2i7qLO17VXSek2ln2atYsrVa0rUbhdTmBHIdr1er1dyJrly5cLvXO2stVbeXLlcAQ8c+Nxbcf2tSC/E4AA/vi1g+tefuRG62i9FXz5AqNJ4RE4x8DHeurqiI+eR4Nvpk+QJKPph3znezeBPVP6fOYlYsG8E70yYZzWpKKCQRx7Wf/LxGHQAYF0gLFHgOoTtiWe6apotGZJp/jSp1iTtFWEx34jBTecSNiHebPKcYWuEFd58c/YfMFJ3dfnfoAA6RVV7Ul7rf6H0Ws1W7Pnqk0aZs0klNpsXMzzGTZlhnwzwii/+QtLlmzERpHC1DD3WHXw3a49tSbBkj/Gu0lfFjWBp+ZAigAZQ/DuZyC7Pnnr/7ssTFPFbrNHZSUuBPhu9ffQIvCA7LUd8/AAABLF4EI6P4A/NQK10yu+c5LYZ+OMSaIzJtXqgAHms1ZcaaAF4xGMZa8/xNygyQIADBtdiMlXdHN15davyhxD+3AAFTQPqAAAAA=="

                    className="h-[18.75rem] object-cover rounded w-full  max-md:h-auto max-sm:h-52 "
                    
                />
                <Link href={'/home'} className="bg-zinc-600 rounded-lg block absolute top-3 left-3" title="voltar para tela de anterior">
                    <ChevronLeft  size={32} className=" text-zinc-300 "/>
                </Link>
            </header>
            <div className="text-center">
                <Heading size="3.5xl">{game.name}</Heading>
                {
                    announcements.length > 0 && (
                        <Text type="secondary">Está na hora de encontrar o seu duo {user?.username}</Text>
                    )
                }
            </div>

            {
                announcements.length === 0 ?(
                    <EmptyAnnouncements/>
                )
                : (
                    <AnnoucementsCarrousel userIsLogged={userIsLoged} annoucements={announcements}/>

                )
            }
            

        </div>
    )
}