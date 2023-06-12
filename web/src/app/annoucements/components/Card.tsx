import { useState } from "react";
import { Gamepad2 } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog';
import * as PopoverRadix from '@radix-ui/react-popover';


import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { weekdaysFormated } from "@/utils/weekDays";
import { UnauthorizedModal } from "@/components/UnauthorizedModal";



import { Popover } from "./Popover";
import { Heading } from "@/components/Heading";
import { Toast } from "@/components/Toast";

export interface CardProps {
    userIsLogged: boolean,
    user: string;
    nickName: string;
    timePlayed: number;
    avaliable: {
        weekDays: string[],
        startTime: string,
        endTime: string
    };
    useChatVoice: boolean;
}


export function Card({ user, avaliable, timePlayed, useChatVoice, nickName,userIsLogged }: CardProps){
    const [pophoverIsVisible, setPopoverIsVisible] = useState(false)
    const [toastVisibility, setToastVisibility] = useState(false)
    const [clipboardContent, setClipboardContent] = useState('')

    const [nameWithoutDiscriminator] = user.split('#')
    const startTimeFormated = avaliable.startTime.replace(/:\d{2}$/, "")
    const endtimeFormated = avaliable.endTime.replace(/:\d{2}$/, "")

    const weedays = avaliable.weekDays.map(day => {
        const weekDay = weekdaysFormated.find(dayFormated => dayFormated.value.toUpperCase() === day.toLocaleUpperCase())
       
        if (weekDay ) return weekDay.label.toLowerCase().slice(0,3)
    })

    function closePopover(cliboardContent: string){
        setPopoverIsVisible(false)
        setToastVisibility(true)
        setClipboardContent(cliboardContent)
    }
    return (
        <div className="keen-slider__slide bg-[#2A2634] rounded-lg flex w-full flex-col gap-4 py-5 px-7" >
            <div>
                <Text className="block" type="secondary">Nome</Text>
                <Text className="font-bold" asChild>
                    <strong>
                        {nameWithoutDiscriminator}
                    </strong>
                </Text>
            </div>
            <div>
                <Text className="block" type="secondary" >Tempo de jogo</Text>
                <Text className="font-bold">{timePlayed} anos</Text>
            </div>
            <div>
                <Text className="block" type="secondary" >Disponibilidade</Text>
                <Text className="font-bold" >
                    {weedays.map(day => ` ${day},`)}
                    <span className="block">
                        {startTimeFormated} - {endtimeFormated}
                    </span>
                </Text>
            </div>
            <div>
                <Text className="block" type="secondary" >Chamada de áudio?</Text>
                <span className={` font-bold ${useChatVoice ? 'text-green-500' : 'text-red-500'}`}>
                        {useChatVoice ? 'Sim' : 'Não'}

                    </span>
           
            </div>
            {
                userIsLogged ?  (
                    <PopoverRadix.Root 
                        open={pophoverIsVisible} 
                        onOpenChange={event => setPopoverIsVisible(event)}
                    >
                        <div className="flex">
                            <PopoverRadix.Trigger asChild>
                                <button
                                    className="w-full rounded-md gap-3 px-4 py-3 flex justify-center items-center bg-violet-500  hover:bg-violet-600 hover:text-white font-medium disabled:bg-violet-800 disabled:cursor-not-allowed"
                                    aria-label="Update dimensions"
                                >
                                    <Gamepad2/> Conectar
                                </button>
                            </PopoverRadix.Trigger>
                            <PopoverRadix.Anchor className="relative bottom-[150px] left-8" />

                        </div>
                        <Popover 
                        
                            dicord={user}
                            onClosePopover={closePopover}
                            nickname={nickName}
                        />
                    </PopoverRadix.Root>


                ) : (
                    <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button>Conectar</Button>
                            </Dialog.Trigger>
                            <UnauthorizedModal
                                title="Crie um usuário"
                                content={`Você precisa estar logado para ver o Discord e nickname de ${nameWithoutDiscriminator}`}
                            />
                    </Dialog.Root>
                )
            }

            {
                toastVisibility && (

                        <Toast
                            open={toastVisibility}
                            title="Conteúdo copiado"
                            onClick={() => setToastVisibility(false)}
                            onOpenChange={setToastVisibility}
                            description={<>você acabou de copiar <strong>{clipboardContent}</strong> para a sua tranferencia</>}
                        />
              
                )
            }


        </div>
    )
}



