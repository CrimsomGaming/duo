'use client'

import Link from "next/link";
import Image from "next/image";


import { Text } from "@/components/Text";
import { GAME_DTO } from "@/DTO/GAME_DTO";


export function GameBanner(props: GAME_DTO) {
    return (
        <Link   href={`/annoucements/${props.id}`} className="keen-slider__slide relative rounded-lg overflow-hidden w-60">
            <Image 
                quality={60} 
                
                width={200} 
                height={300} 
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRsIDAABXRUJQVlA4WAoAAAAgAAAARAEAjQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg1AEAAJASAJ0BKkUBjgA+bTaWSaQioaEgKHCADYlpbt30zL/ye8Pl/iAFrDKMUajUSvgpbtXNol0y7f8HVZM52Rt21Zdjzcmez3P/R0Xm1gS9hemxCi7XePCeh3t8Hw0qp23e6t2i7qLO17VXSek2ln2atYsrVa0rUbhdTmBHIdr1er1dyJrly5cLvXO2stVbeXLlcAQ8c+Nxbcf2tSC/E4AA/vi1g+tefuRG62i9FXz5AqNJ4RE4x8DHeurqiI+eR4Nvpk+QJKPph3znezeBPVP6fOYlYsG8E70yYZzWpKKCQRx7Wf/LxGHQAYF0gLFHgOoTtiWe6apotGZJp/jSp1iTtFWEx34jBTecSNiHebPKcYWuEFd58c/YfMFJ3dfnfoAA6RVV7Ul7rf6H0Ws1W7Pnqk0aZs0klNpsXMzzGTZlhnwzwii/+QtLlmzERpHC1DD3WHXw3a49tSbBkj/Gu0lfFjWBp+ZAigAZQ/DuZyC7Pnnr/7ssTFPFbrNHZSUuBPhu9ffQIvCA7LUd8/AAABLF4EI6P4A/NQK10yu+c5LYZ+OMSaIzJtXqgAHms1ZcaaAF4xGMZa8/xNygyQIADBtdiMlXdHN15davyhxD+3AAFTQPqAAAAA=="
                className="  h-60 w-full max-sm:h-[23rem] " src={props.image} alt={`foto ilustrativa do game ${props.name}`}
             />

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