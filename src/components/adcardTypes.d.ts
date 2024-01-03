export type AdvertProps = {
    data: CardTypes[];
    grid: number[];
}

export interface FavoriteProps {
    error?: {
        message?: string
    },
    success?: boolean
}

export interface CardTypes {
    city?: string,
    county?: string,
    date?: string,
    description?: string,
    display_name?: string,
    display_type?: string
    has_favorite?: boolean,
    how_status?:string,
    id?:string,
    photo?: string,
    price?:string,
    title?:string,
    user_type?:string
}