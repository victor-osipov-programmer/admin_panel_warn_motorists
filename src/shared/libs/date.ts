export const addZero = (number: number): string => `${number}`.length == 1 ? `0${number}` : `${number}`
export const dateToString = (date: Date): string => `${addZero(date.getDate())}-${addZero(date.getMonth() + 1)}-${date.getFullYear()}`
export const dateToStringShort = (date: Date): string => `${addZero(date.getDate())}-${addZero(date.getMonth() + 1)}`