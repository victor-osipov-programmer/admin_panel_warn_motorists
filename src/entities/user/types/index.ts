export interface IUserApi {
    id: string,
    phone: string,
    name: string,
    avatar: string,
    subscriptionLevel: string,
    cars_owned: ICarOwned[] | null,
    subscription_end: string | null,
    is_blocked: boolean
}

export interface ICarOwned {
    number: string,
    brand: string
}