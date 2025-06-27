declare interface Iprofiles {
    _id?:string,
    token?:string,
    genshin: boolean,
    honkai_star_rail: boolean,
    honkai_3: boolean,
    accountName: string,
    createdAt?: string,
}
declare interface Iresponses {
    genshin: string,
    honkai_star_rail: string,
    honkai_3: string,
    accountName: string
}