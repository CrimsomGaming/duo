import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { weekdaysFormated } from "@/utils/weekDays";
import { Gamepad2 } from 'lucide-react'


export interface CardProps {
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


export function Card({ user, avaliable, timePlayed, useChatVoice }: CardProps){
    const weedays = avaliable.weekDays.map(day => {
        const weekDay = weekdaysFormated.find(dayFormated => dayFormated.value.toUpperCase() === day.toLocaleUpperCase())
       
        if (weekDay ) return weekDay.label.toLowerCase().slice(0,3)
    })
    return (
        <div className="keen-slider__slide bg-[#2A2634] rounded-lg flex w-full flex-col gap-4 py-5 px-7" >
            <div>
                <Text className="block" type="secondary">Nome</Text>
                <Text className="font-bold" asChild>
                    <strong>
                        {user}
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
                        {avaliable.startTime} {avaliable.endTime}
                    </span>
                </Text>
            </div>
            <div>
                <Text className="block" type="secondary" >Chamada de áudio?</Text>
                <Text  className={`${useChatVoice ? 'text-green-600' : 'text-red-600'} font-bold`}>
                    {useChatVoice ? 'Sim' : 'Não'}
                </Text>
            </div>

            <Button>
                <Gamepad2 size={24} />
                Conectar
            </Button>
        </div>
    )
}



