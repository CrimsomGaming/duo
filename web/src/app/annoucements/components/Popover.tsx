
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import * as PopoverRadix from '@radix-ui/react-popover';
import {Clipboard} from 'lucide-react'
import * as Portal from '@radix-ui/react-portal';

interface PopoverProps {
    nickname: string;
    dicord: string;
    onClosePopover: (cliboardContent: string) => void;
}

export function Popover({ nickname, dicord,onClosePopover }: PopoverProps){
    async function copyTextToClipboard(cliboardContent: string){
        await navigator.clipboard.writeText(cliboardContent)
        onClosePopover(cliboardContent)
        
    }
    return (
        <PopoverRadix.Portal>
            <PopoverRadix.Content
                side='right'
                className={`  bg-[#3d374c] min-w-[216px]  p-6 rounded-lg flex flex-col gap-4`}
                sideOffset={5}
            >   
                <div className='flex flex-col gap-1'>
                    <Text>NickName</Text>
                    <Button 
                        variant='secundary' 
                        className=' py-2 justify-between ' 
                        onClick={() => copyTextToClipboard(nickname)}
                    >
                        {nickname}   
                        <Clipboard size={16} />
                    </Button>

                </div>

                <div className='flex flex-col gap-1'>
                    <Text>Discord</Text>
                    <Button 
                        className=' py-2 justify-between ' 
                        variant='secundary'
                        onClick={() => copyTextToClipboard(dicord) }
                    >
                        {dicord}
                        <Clipboard size={18}/>
                    </Button>

                </div>

              
                
                <PopoverRadix.Arrow className="fill-[#3d374c]" />

            </PopoverRadix.Content>
        </PopoverRadix.Portal>
    )
}