import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, forwardRef } from "react";
import {Text} from '../Text'
import clsx from "clsx";



interface TextInputRootProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
}

function TextInputRoot({ children,...rest }: TextInputRootProps){
    return (
        <label {...rest} className="flex flex-col gap-2">
            {children}
            
        </label>
    )
}

TextInputRoot.displayName = 'TextInputRoot';


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{}


const Input = forwardRef<HTMLInputElement, TextInputProps>((props,ref) => {
    return (
        <input 
            {...props} 
            ref={ref} 
            className={clsx('px-4 h-12 rounded-[4px]  flex items-center bg-zinc-900  text-sm placeholder:text-zinc-500  focus:ring-gray-500 focus:border-gray-500',props.className)}
        />
    )
})

Input.displayName = 'TextInput'

interface TextInputErrorProps {
    children: ReactNode
}

function TextInputError({ children }: TextInputErrorProps ){
    return (
        <Text size="sm" className="text-red-600">
            {children}
        </Text>
    )
    
}

TextInputError.displayName = 'TextInputError'


interface TextInputTitleProps {
    children: ReactNode
}

function TextInputTitle({ children }: TextInputTitleProps ){
    return (
        <Text className="font-semibold">
            {children}
        </Text>
    )

}


export  const TextInput  = {
    Input: Input,
    Root: TextInputRoot,
    Title: TextInputTitle,
    Error: TextInputError
}
