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
    price?:string
    title?:string
    user_image?:{ 
        url: string, 
        path: string
    },
    user_type?:string,
    userid?:number,
    photo?: {
        height?: string,
        images_id?:string,
        is_cover_image?:boolean,
        path?:string,
        url?:string
        width?:string
    }[]
}

