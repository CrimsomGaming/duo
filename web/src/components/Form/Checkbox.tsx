import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check as CheckIcon } from 'lucide-react'

interface ChekBoxProps extends CheckboxRadix.CheckboxProps {}

export function Checkbox(props: ChekBoxProps){
    return (
        <CheckboxRadix.Root {...props} className='h-6 w-6  bg-zinc-900 text-blue-300 rounded-md'>
            <CheckboxRadix.Indicator className='flex justify-center items-center'>
                <CheckIcon size={16} className=' text-green-500'/>    
            </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
    )
}  