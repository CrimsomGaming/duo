import * as Dialog from '@radix-ui/react-dialog';

import { WeekDaysSelector } from './WeekDaysSelector';

import {Gamepad2} from 'lucide-react'
import { Checkbox } from './Form/Checkbox';
import { TextInput } from './Form/Input';

interface Game {
    id: string,
    title: string
}
interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal({ games }: CreateAdModalProps) {
   
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='w-screen h-screen bg-black/60 fixed inset-0 ' />

            <Dialog.Content
                className='
                max-w-[522px]
                w-[calc(100%-32px)]
            fixed   bg-[#2A2634] py-10 px-8 shadow-lg shadow-black/25 text-white
            rounded-lg top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2
          '
            >
                <Dialog.Title className='text-[2rem] font-black '>Publique um anúncio</Dialog.Title>
                <form  className='mt-8 '>
                    <section className='flex gap-y-4 flex-col'>
                    

                        <div className='flex flex-col gap-y-2 '>
                            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                            <select
                                id="gameId"
                                name='gameId'
                                defaultValue={''}
                                className='py-3 px-4 bg-zinc-900 text-sm placeholder:text-zinc-500 rounded-[4px] appearance-none focus:ring-gray-500 focus:border-gray-500'
                            >
                                <option disabled value="">Selecione o game que deseja jogar</option>
                                {
                                    games.map(game => (
                                        <option key={game.id} value={game.id}>{game.title}</option>
                                    ))
                                }

                            </select>
                        </div>

                        

                        <TextInput.Root>
                            <TextInput.Title>Seu nome (ou nickname)</TextInput.Title>
                            <TextInput.Input  
                                autoComplete='off'
                                placeholder='Como te chamam dentro do game?'
                            />
                        </TextInput.Root>

                      

                        
                        <TextInput.Root>
                            <TextInput.Title>Joga há quantos anos?</TextInput.Title>
                            <TextInput.Input
                                type="number"
                                id='yearsPlaying'
                                name='yearsPlaying'
                                min={0}
                                max={70}
                                placeholder='Tudo bem ser ZERO'
                            />
                        </TextInput.Root>

                          
                        <div className='flex gap-x-6'>
                            <div className='flex flex-col gap-y-2'>
                                <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar?</label>

                                <WeekDaysSelector
                                    updateWeekDays={() => {}}
                                    weekDays={['']}
                                />

                            </div>

                            <div className='flex flex-col  gap-y-2 flex-1'>
                                <label className='font-semibold'>Qual horário do dia</label>
                                <div className='grid grid-cols-2  gap-x-2'>
                                    <TextInput.Input
                                        type="time"
                                        defaultValue={'08:00'}
                                        name="hourStart"
                                        id='hourStart'
                                        placeholder='Até'
                                        className='h-9'
                                        
                                    />

                                    <TextInput.Input
                                        type="time"
                                        name='hourEnd'
                                        id='hourEnd'
                                        placeholder='De'
                                        defaultValue={'16:00'}
                                        className='h-9'
                                    />
                                </div>
                            </div>

                        </div>
                    </section>
                    <label className='mt-6 flex gap-x-2 text-sm items-center' >
                        <Checkbox/>
                        <span>Costumo me conectar ao chat de voz</span>
                    </label>
                    <footer className='flex justify-end gap-x-4 mt-8'>
                        <Dialog.Close asChild>
                            <button type='button' className='py-4 px-[20px] bg-zinc-500 font-semibold  rounded-md'>Cancelar</button>
                        </Dialog.Close>
                        <button type='submit' className='py-3 px-[20px] bg-violet-500 font-semibold flex gap-x-3 rounded-md'>
                            <Gamepad2 size={24} />
                            Encontrar duo
                        </button>
                    </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
