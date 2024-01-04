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
    how_status?: string,
    id?: string,
    photo?: string,
    price?: string,
    title?: string,
    user_type?: string
}

export interface DetailCardTypes {
    city?: string,
    county?: string,
    date?: string,
    description?: string,
    display_name?: string,
    display_type?: string,
    fullname?: string
    how_status?: string,
    id?: string
    price?: string
    title?: string
    user_image?: {
        url: string,
        path: string
    },
    user_type?: string,
    userid?: number,
    photo?: {
        height?: string,
        images_id?: string,
        is_cover_image?: boolean,
        path?: string,
        url?: string
        width?: string
    }[]
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface PostCategory {
    category_id: string
    category_name: string,
    icon: string,
    key_id: number,
    sub_category: {
        main_category_id: number,
        sub_category_id: number,
        sub_category_name: string
    }[]
}

export interface MyAdProp {
    id?:string,
    is_cover_image?:string,
    is_visible?:boolean,
    likes?:string,
    price?:string,
    title?:string
}