
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
    main_category_id?: string,
    sub_category_id?: string,
    id?: string,
    photo?: string,
    price?: string,
    title?: string,
    user_type?: string
}

export interface DetailCaredPhotoTypes {
    height?: string,
    images_id?: string,
    is_cover_image?: boolean,
    path?: string,
    url?: string
    width?: string
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
    has_favorite?: boolean,
    photo?: DetailCardTypes
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
    id?: string,
    is_cover_image?: string,
    is_visible?: boolean,
    is_sell?:boolean,
    status_id?: string,
    likes?: string,
    price?: string,
    title?: string
}

export interface UserProfileProp {
    date?: string
    fullname?: string,
    photo?: {
        path?: string,
        url?: string
    }

}

export interface CitiesProps {
    city?: string,
    id?: number,
    plateno?: string
}

export interface CountiesProps {
    county?: string,
    id?: 102
}

export interface EditAdvertImages {
    image_id?:number,
    is_cover_image?:boolean,
    path?:string
}

export interface EditAdvertDetail {
    category_name?: string,
    city_id?: number,
    county_id?: number,
    description?: string,
    how_status?: string,
    id?: string,
    images?: EditAdvertImages[],
    price?:string,
    sub_category_name?:string,
    title?:string
}