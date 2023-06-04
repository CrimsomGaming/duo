import * as ToggleGroup from "@radix-ui/react-toggle-group";


type WeekDaysProps = string[]

interface WeekDaysSelectorProps {
    weekDays: WeekDaysProps,
    updateWeekDays: (weekDaysUpdated: WeekDaysProps) => void
}


export function WeekDaysSelector({ updateWeekDays, weekDays }: WeekDaysSelectorProps) {
    function handleUpdateWeekDays(weekDaysUpdated: WeekDaysProps) {
        updateWeekDays(weekDaysUpdated)
    }

    return (
        <ToggleGroup.Root
            type='multiple'
            className='grid grid-cols-4 gap-1'
            defaultValue={weekDays}
            onValueChange={handleUpdateWeekDays}
        >
            <ToggleGroup.Item
                value='0'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('0') && 'bg-violet-600'}`}
                title='domingo'>D
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='1'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('1') && 'bg-violet-600'}`}
                title='segunda'>S
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='2'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('2') && 'bg-violet-600'}`}
                title='terça'>T
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='3'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('3') && 'bg-violet-600'}`}
                title='quarta'>Q
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='4'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('4') && 'bg-violet-600'}`}
                title='quinta'>Q
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='5'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('5') && 'bg-violet-600'}`}
                title='sexta'>S
            </ToggleGroup.Item>

            <ToggleGroup.Item
                value='6'
                className={`w-8 h-8 bg-zinc-900 rounded font-bold ${weekDays.includes('6') && 'bg-violet-600'}`}
                title='sábado'>S
            </ToggleGroup.Item>
        </ToggleGroup.Root>
    )
}