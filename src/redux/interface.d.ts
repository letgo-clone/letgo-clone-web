// Menu state interfaces

export interface SubCategory {
    main_category_id: number,
    sub_category_id: number,
    sub_category_name: string
}

export interface Menu {
    category_id: string
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
    id?: number,
    about?: string,
    email?: string,
    fullname?: string,
    phone_number?: string,
    photo?: loginPhoto
}

export interface AuthUserState {
    loginData?: LoginData;
}

// Category
export interface Category {
    subCategoryName?: string,
    mainCategoryName?: string,
    subCategoryId?: number,
    mainCategoryId?: number,
}

export interface CurrentCategoryState {
    currentCategoryData?: Category[];
}

// Search

export interface Search {
    title: string,
    date: string
}

export interface RecentSearch {
    searchData: Search[]
}

// search modal
export interface searchDrawerState {
    searchDrawer?: boolean;
}
