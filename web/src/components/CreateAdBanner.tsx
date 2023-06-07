'use client'

import { ZoomIn } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Text } from './Text'
import { Button } from './Button'
import { Heading } from './Heading'
import { CreateAdModal } from './CreateAdModal'
import { useState } from 'react'

export function CreateAdBanner() {
    const [AdModalIsVisible, setAdModalIsVisible] = useState(false)


    function handleCloseModal(){
        setAdModalIsVisible(false)
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

                <Dialog.Root open={AdModalIsVisible} onOpenChange={event => setAdModalIsVisible(event)}>
                    <Dialog.Trigger asChild>
                        <Button className='w-max'  >
                            <ZoomIn size={24} />
                            <span className='text-white font-medium text-lg '>Publicar anúncio</span>
                        </Button>
                    </Dialog.Trigger>
                    <CreateAdModal onClose={handleCloseModal}/>
                </Dialog.Root>
          
            </div>
        </footer>
    )
}