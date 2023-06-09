export interface ANNOUCEMENT_DTO {
    id: number,
    user: string,
    nickname: string,
    play_since: 7,
    play_weekdays: string[],
    play_period_start: string
    play_period_end: string,
    voice_chat: boolean
}