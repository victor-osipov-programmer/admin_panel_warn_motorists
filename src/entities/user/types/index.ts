// export interface IUserApi {
//     id: string,
//     phone: string,
//     name: string,
//     avatar: string,
//     subscriptionLevel: string,
//     cars_owned: ICarOwned[] | null,
//     subscription_end: string | null,
//     is_blocked: boolean
// }

export interface ICarOwned { // надо проверить
    id: number,
    name: string,
    brand: string,
    num: string,
    active: boolean
}

export interface IUserApi {
    id: number,
    phone: string,
    name: string,
    img: string,
    lang: string,
    active: boolean,
    subscription: null | string,
    ban: null | string,
    car_count: number,
    created_at: string
}