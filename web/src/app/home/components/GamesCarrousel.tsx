'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"
import {ChevronLeft,  ChevronRight} from 'lucide-react'

import { GameBanner } from "./GameBanner"
import { GAME_DTO } from '@/DTO/GAME_DTO'

interface GamesCarousellProps {
    games: GAME_DTO[]
}

export function GamesCarousell({games }: GamesCarousellProps){
    
    const [sliderRef, instanceRef] = useKeenSlider({
        breakpoints: {
            '(max-width: 991px)': {
                slides: {
                    perView: 4,
                    spacing: 24,

                }
            },
            '(max-width: 767px)': {
                slides: {
                    perView: 3.2,
                    spacing: 16,

                }
            },

            '(max-width: 480px)': {
                slides: {
                    perView: 1.2,
                    spacing: 16,

                }
            },
        },
        loop: true,

        slides: {

            perView: 6,
            spacing: 24,

        }
    })

    function handleScrollToNextSlide(){
        instanceRef.current?.next()
    }

    function handleScrollToPreviousSlide(){
        instanceRef.current?.prev()
    }

    return (
        <div className="relative  ">
            <button
                title="jogos anteriores" 
                onClick={handleScrollToPreviousSlide}
                className=" absolute -left-14  top-1/2 -translate-y-1/2 z-10 max-sm:hidden"
            >
                <ChevronLeft className="text-zinc-400" size={48}/>
            </button>
            <button
                
                title="jogos posteriores" 
                onClick={handleScrollToNextSlide}
                className="absolute  -right-14 z-20  top-1/2 -translate-y-1/2 max-sm:hidden"
            >
                <ChevronRight className="text-zinc-400" size={48} />
            </button>
                <div ref={sliderRef} className="keen-slider relative ">
                    
                    {games.map(game => {
                        return (
                            <GameBanner
                                id={game.id}
                                key={game.id}
                                name={game.name}
                                image={game.image}
                                ads_count={game.ads_count}
                            />
                        )
                    })}
                </div>
           
        </div>
        )
}