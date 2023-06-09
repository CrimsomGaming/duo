import { Heading } from "@/components/Heading"
import { Text } from "@/components/Text"
import Image from "next/image"
import { Card } from "../components/Card"
import { useKeenSlider } from "keen-slider/react"
import { AnnoucementsCarrousel } from "../components/AnnoucementsCarrouesel"

interface AnnoucementsProps {
    params: {
        id: string
    }
}


export default async function Annoucements({ params:{id}}: AnnoucementsProps){

    return (
        <div className="max-w-[1440px] px-4 py-4 mx-auto gap-6  min-h-screen flex flex-col justify-center ">
            <Image
                src='http://localhost:3000/Lol-backgroud.jpg'
                alt=""
                width={1344}
                loading="lazy"
                height={300}
                className="h-[18.75rem] object-cover rounded w-full "
                
            />
            <div className="text-center">
                <Heading size="3.5xl">League of Legends</Heading>
                <Text type="secondary">Está na hora de encontrar o seu duo vitor</Text>
            </div>

           <AnnoucementsCarrousel/>

        </div>
    )
}