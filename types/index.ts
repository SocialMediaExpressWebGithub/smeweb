export type CategoryType = {
    id: string,
    catName: string
}

export type ServiceType = {
    id: string,
    servicesname: string
}

export type NewsType = {
    id: string,
    header: string,
    content: string,
    imageUrl: string[],
    publicId: string[],
    eventplace: string,
    source: string,
    socialmedialinks: string[],
    newsdatetime: string,
    catName: string,
    newslist : string[],
    authorEmail : string | null
}


export type ViewType={
    viewlist :string
}

export type RecordType<Keys extends string | number | symbol, Value> = {
    [K in Keys]: Value;
};