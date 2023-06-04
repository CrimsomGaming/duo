'use client'
import Image from "next/image";
import { Text } from "./Text";
import { GAME_DTO } from "@/DTO/GAME_DTO";


export function GameBanner(props: GAME_DTO) {
    return (
        <a href="#" className="keen-slider__slide relative rounded-lg overflow-hidden w-60">
            <Image quality={1} loading="lazy" width={200} height={240} className="  h-60 w-full  " src={props.bannerUrl} alt="#" />

            <div className=" pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <Text asChild>
                    <strong className=" block">{props.title}</strong>

                </Text>
                <Text size="sm">

                    <span  className="text-zinc-300 block">{props.adsCount} anúncio(s)</span>
                </Text>
            </div>
        </a>
    );
}