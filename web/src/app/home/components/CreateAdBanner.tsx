'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { ZoomIn } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { UnauthorizedModal } from '@/components/UnauthorizedModal'

import { CreateAdModal } from './CreateAdModal'
import { Toast } from '@/components/Toast'

export function CreateAdBanner() {
    const token = Cookies.get('token')
    const [gameSelect, setGameSelect] = useState('')
    const [toastVisibility, setToastVisibility] = useState(false)
    
    const useIsLoged = !!token
    const [AdModalIsVisible, setAdModalIsVisible] = useState(false)


    function handleCloseModal(gameSelected?: string){
        setAdModalIsVisible(false)
        setToastVisibility(true)
        setGameSelect(gameSelected as string)
    }

    return (
        <footer className='rounded-xl rounded-t-lg rounde  self-stretch  pt-1 bg-nlw-gradient items-center'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between gap-4 rounded-b-lg max-sm:flex-col'>
                <div>
                    <Heading size='2xl'>
                        <strong className='xl font-black'>
                            Não encontrou seu duo?
                        </strong>

                    </Heading>
                    <Text type='secondary' asChild  >
                        <p >
                            Publique um anúncio para encontrar novos players!
                        </p>

                    </Text>
                </div>

                {
                    useIsLoged ? (
                        <Dialog.Root open={AdModalIsVisible} onOpenChange={event => setAdModalIsVisible(event)}>
                            <Dialog.Trigger asChild>
                                <Button className='w-max'  >
                                    <ZoomIn size={24} />
                                    <span className='text-white font-medium text-lg '>Publicar anúncio</span>
                                </Button>
                            </Dialog.Trigger>
                            <CreateAdModal onClose={handleCloseModal}/>
                        </Dialog.Root>

                    )
                    : (

                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <Button className='w-max'  >
                                        <ZoomIn size={24} />
                                        <span className='text-white font-medium text-lg '>Publicar anúncio</span>
                                    </Button>

                                </Dialog.Trigger>
                                <UnauthorizedModal
                                    title="Crie um usuário"
                                    content={`Você precisa estar logado para publicar um novo annúncio`}
                                />
                            </Dialog.Root>
                    )
                }
              

                <Toast
                    open={toastVisibility}
                    onOpenChange={setToastVisibility}
                    onClick={() => {setAdModalIsVisible(false)}}
                    title='Anuncio Criado'
                    description={`Você criou um novo annúncio de ${gameSelect}`}
                    
                />
                
            </div>
        </footer>
    )
}