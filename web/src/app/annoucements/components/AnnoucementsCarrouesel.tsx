'use client'
import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from "keen-slider/react"
import { Card } from './Card'
import { ANNOUCEMENT_DTO } from '@/DTO/ANNOUCEMENTS_DTO'


interface AnnoucementsCarrousel {
    annoucements: ANNOUCEMENT_DTO[],
    userIsLogged: boolean,
}



export function AnnoucementsCarrousel({ annoucements,userIsLogged}: AnnoucementsCarrousel){
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 3.2,
            spacing: 24
        }
    })
    return (
        <div ref={sliderRef} className='keen-slider max-w-[831px] mx-auto'>
           {
            annoucements.map(annoucement=> (
                <Card
                    userIsLogged={userIsLogged}
                    key={annoucement.id}
                    avaliable={{
                        endTime: annoucement.play_period_end,
                        startTime: annoucement.play_period_start,
                        weekDays: annoucement.play_weekdays
                    }}
                    nickName={annoucement.nickname}
                    timePlayed={annoucement.play_since}
                    useChatVoice={annoucement.voice_chat}
                    user={annoucement.user}
                />

            ))
           
           }
           
        </div>
    )
}