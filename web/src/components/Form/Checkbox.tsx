import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check as CheckIcon } from 'lucide-react'

export function Checkbox(){
    return (
        <CheckboxRadix.Root className='h-6 w-6  bg-zinc-900 text-blue-300 rounded-md'>
            <CheckboxRadix.Indicator className='flex justify-center items-center'>
                <CheckIcon size={16} className=' text-green-500'/>    
            </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
    )
}  