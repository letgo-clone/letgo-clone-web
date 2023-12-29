// Menu state interfaces

export interface SubCategory {
    sub_category_id: number,
    sub_category_name: string
}

export interface Menu {
    category_name: string,
    icon: string,
    sub_category: SubCategory[]
}

export interface MenuState {
    menuData?: Menu[];
}

// Login state interfaces
export interface loginPhoto {
    path: string,
    url: string
}

export interface LoginData {
    about: string,
    email: string,
    fullname: string,
    phone_number: string,
    photo: loginPhoto[]
}

export interface AuthUserState {
    loginData?: LoginData[];
}