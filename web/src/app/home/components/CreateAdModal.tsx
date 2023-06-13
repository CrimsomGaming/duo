import { z } from 'zod';
import Cookies from 'js-cookie'
import {Gamepad2} from 'lucide-react'
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm,   Controller} from 'react-hook-form';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form/Input';
import { Checkbox } from '@/components/Form/Checkbox';
import { WeekDaysSelector } from '@/components/WeekDaysSelector';

import { api } from '@/libs/api';
import { GAME_DTO } from '@/DTO/GAME_DTO';
import { weekdaysFormated } from '@/utils/weekDays';


const newGameAdFormSchema = z.object({
    nickname: z.string({ required_error: 'Preecha o seu nickName.' }).min(2, 'O nickname deve conter pelo menos 2 caracteres.'),
    gameId: z.string({required_error:'Selecione um jogo'}),
    timePlayed: z.coerce.number({ required_error: 'Nos Conte a quanto tempo você joga.' }),
    startHour: z.string(),
    endHour: z.string(),
    enableChatVoice: z.boolean().default(false),
    weekDays: z.array(z.object({
        value: z.string(),
        isChecked: z.boolean(),
        label: z.string()
    })).refine(weekdays => weekdays.some(day=> day.isChecked === true), {
        message: 'preencha pelo menos um dia da semana'  
    } )
    .transform(weekdays => weekdays.filter(day => day.isChecked))
    .transform(weekdays => weekdays.map(day => day.value))
})

type newGameAdFormSchemaData = z.input <typeof newGameAdFormSchema>

interface CreateAdModalProps {
    onClose: (gameSelected?: string) => void
}

export function CreateAdModal({ onClose }:CreateAdModalProps) {
    const token = Cookies.get('token')
    
    const [games,setGames] = useState<GAME_DTO[]>([])
    async function fetchGames(){
        const response = await api.get('/games')
        setGames(response.data)
    }

    const { formState, register, watch, setValue, handleSubmit, control} = useForm<newGameAdFormSchemaData>({
        resolver: zodResolver(newGameAdFormSchema),
        defaultValues: {
            timePlayed:0,
            startHour: '08:00',
            endHour: '16:00',
            weekDays: weekdaysFormated.map(weekday => {
                return {
                    isChecked: weekday.isChecked,
                    label: weekday.label,
                    value: weekday.value

                }
            })
        }
    })

    const { errors, isSubmitting} = formState

    const weekDays = watch('weekDays')

    function handleUpdateWeekDay(weekDaysChecked: string[]){
        
        const weekDaysUpdated = weekDays.map(day => {
            const dayIsChecked = weekDaysChecked.includes(day.value)
            if(dayIsChecked){ 
                return {
                    ...day,
                    isChecked: true
                }
            }
            return {
                ...day,
                isChecked: false
            }
        })
    
        setValue('weekDays', weekDaysUpdated)
    }

    function handleCloseModal(gameId: number){
        const gameSelected = games.find(game => game.id === gameId)
        onClose(gameSelected?.name)
    }

  
    async function handleCreateNewAd(formData: newGameAdFormSchemaData){
        try {
           await api.post('/games/add', {
               game_id: formData.gameId,
               nickname: formData.nickname,
               play_since: formData.timePlayed,
               play_weekdays: formData.weekDays,
               play_period_start: formData.startHour,
               play_period_end: formData.endHour,
               voice_chat: formData.enableChatVoice
           },{
               headers: {
                   Authorization: `Bearer ${token}`
               }
           })
         
        } catch (error) {
            console.log(error)
        }
        finally {
            handleCloseModal(Number(formData.gameId))
        }
    }

    useEffect(() => {fetchGames()},[])

    return (
        <Dialog.Portal >
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
                <form onSubmit={handleSubmit(handleCreateNewAd)}  className='mt-8 '>
                    <section className='flex gap-y-4 flex-col'>
                        <div className='flex flex-col gap-y-2 '>
                            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                            <select
                                {...register('gameId')}
                                placeholder='Selecione o game que deseja jogar'                           
                                className='py-3 px-4 bg-zinc-900 text-sm placeholder:text-zinc-500 rounded-[4px] appearance-none focus:ring-gray-500 focus:border-gray-500'
                            >
                                <option disabled value="ddddd">Selecione o game que deseja jogar</option>
                                {
                                    games.map(game => (
                                        <option key={game.id} value={game.id}>{game.name}</option>
                                    ))
                                }

                            </select>
                            {errors.gameId && errors.gameId.message && (
                                <span className='text-sm mt-1 text-red-600'>{errors.gameId.message}</span>
                            )}
                        </div>

                        <TextInput.Root>
                            <TextInput.Title>Seu nome (ou nickname)</TextInput.Title>
                            <TextInput.Input  
                                {...register('nickname')}
                                autoComplete='off'

                                placeholder='Como te chamam dentro do game?'
                            />
                            {errors.nickname && errors.nickname.message && (
                                <TextInput.Error>{errors.nickname.message}</TextInput.Error>
                            )}
                        </TextInput.Root>

                        <TextInput.Root>
                            <TextInput.Title>Joga há quantos anos?</TextInput.Title>
                            <TextInput.Input
                                {...register('timePlayed')}
                                type="number"
                                min={0}
                                max={70}
                                placeholder='Tudo bem ser ZERO'
                            />
                            {errors.timePlayed && errors.timePlayed.message && (
                                <TextInput.Error>{errors.timePlayed.message}</TextInput.Error>
                            )}
                        </TextInput.Root>

                          
                        <div className='flex gap-x-6'>
                            <div className='flex flex-col gap-y-2'>
                                <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar?</label>

                                <WeekDaysSelector
                                    updateWeekDay={handleUpdateWeekDay}
                                    weekDays={weekDays}
                                    error={errors.weekDays?.message}

                                  
                                />

                            </div>

                            <div className='flex flex-col  gap-y-2 flex-1'>
                                <label className='font-semibold'>Qual horário do dia</label>
                                <div className='grid grid-cols-2  gap-x-2'>
                                    <TextInput.Input
                                        {...register('startHour')}
                                        type="time"
                                        placeholder='Até'
                                        className='h-9'
                                        
                                    />

                                    <TextInput.Input
                                        {...register('endHour')}
                                        type="time"
                                        placeholder='De'
                                        className='h-9'
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <label className='mt-6 flex gap-x-2 text-sm items-center' >
                        <Controller
                            control={control}
                            name='enableChatVoice'
                            render={({field:{onChange}}) => (
                                <Checkbox onCheckedChange={onChange}  />

                            )}
                        />
                        <span>Costumo me conectar ao chat de voz</span>
                    </label>
                    <footer className='flex justify-end gap-x-4 mt-8'>
                        <Dialog.Close asChild>
                            <button type='button' className='py-4 px-[20px] bg-zinc-500 font-semibold  rounded-md'>Cancelar</button>
                        </Dialog.Close>                       
                            <Button 
                                disabled={isSubmitting}
                                type='submit' 
                                className='w-max'
                            >
                                <Gamepad2 size={24} />
                                Encontrar duo
                            </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
