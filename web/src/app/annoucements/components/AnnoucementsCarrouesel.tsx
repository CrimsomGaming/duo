'use client'
import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from "keen-slider/react"
import { Card } from './Card'

export function AnnoucementsCarrousel(){
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 3.1,
            spacing: 24
        }
    })
    return (
        <div ref={sliderRef} className='keen-slider max-w-[831px] mx-auto'>
           {
            [0,2,2,2].map((slider,index) => (
                <Card
                    key={index}
                    avaliable={{
                        endTime: '8:00',
                        startTime: '9:00',
                        weekDays: ['tue', 'mon']
                    }}
                    nickName="joison"
                    timePlayed={2}
                    useChatVoice={true}
                    user="favio02"
                />

            ))
           
           }
           
        </div>
    )
}