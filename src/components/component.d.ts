export type AdCardProps = {
    data: CardTypes[];
    grid: number[];
}


type loginModalProps = {
    isLogin: boolean,
    handleClose: () => void,
}

export type CategoryBannerProps = {
    styles: object | any,
    page: string,
    handleDrawerClose: (() => void) | null,
}
