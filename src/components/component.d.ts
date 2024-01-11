type loginModalProps = {
    isLogin: boolean,
    handleClose: () => void,
}

export type CategoryBannerProps = {
    styles: object | any,
    page: string,
    handleDrawerClose: (() => void) | null,
}

export interface FavoriteTypes {
    id?: string,
    hasFavorite?: boolean,
}