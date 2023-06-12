'use client'

import Link from "next/link";
import Image from "next/image";


import { Text } from "@/components/Text";
import { GAME_DTO } from "@/DTO/GAME_DTO";


export function GameBanner(props: GAME_DTO) {
    return (
        <Link prefetch={false} href={`/annoucements/${props.id}`} className="keen-slider__slide relative rounded-lg overflow-hidden w-60">
            <Image quality={1} loading="lazy" width={200} height={240} className="  h-60 w-full  " src={props.image} alt="#" />

            <div className=" pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <Text asChild>
                    <strong className=" block">{props.name}</strong>

                </Text>
                <Text size="sm">

                    <span  className="text-zinc-300 block">{props.ads_count} anúncio(s)</span>
                </Text>
            </div>
        </Link>
    );
}