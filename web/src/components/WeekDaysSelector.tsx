import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Text } from "./Text";

interface weekDaysProps {
   
    isChecked: boolean;
    value: string;
    label: string
}

interface WeekDaysSelectorProps {
    weekDays: weekDaysProps[],
    updateWeekDay: (weekDaysChecked: string[]) => void;
    error?: string;
   
}


export function WeekDaysSelector({ updateWeekDay, weekDays, error }: WeekDaysSelectorProps) {
    function handleUpdateWeekDays(weedaysChecked: string[]) {
       
        updateWeekDay(weedaysChecked)
    }
    

    return (
        <>
            <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-1'
        onValueChange={weedaysChecked => handleUpdateWeekDays(weedaysChecked)}
            >
                {
                    weekDays.map((weekDay,index) => (
                        <ToggleGroup.Item
                            className={`w-8 h-8 rounded font-bold ${weekDay.isChecked ? 'bg-violet-600' : 'bg-zinc-900 '}`}
                            key={index}
                            value={String(weekDay.value)}>
                            {weekDay.label[0].toUpperCase()}

                        </ToggleGroup.Item>
                    ))
                }
                

            
            </ToggleGroup.Root>
            {
                error && (
                    <Text size="sm" type="error" className=" block max-w-[180px]">
                        {error}
                    </Text>
                )
            }
        
        </>
    )
}