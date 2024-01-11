export type searchProps = {
    dimension: string
}

export interface searchFormTypes {
    cityId?: string,
    location?: string,
    search?: string
}

export type AdCardProps = {
    data: CardTypes[];
    grid: number[];
}

export type NoResultProps = {
    page: string;
}

export type BreadcrumbProps = {
    breadcrumbItems?: { 
        title?: string,
        link?: string
    }[]
}