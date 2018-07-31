type Dereference = {
    attribute:string
    collection:string
    dereferences:Dereference[]
}

type Query = {
    filter:any
    sort:any
    reffedAttributes:Dereference[]
    paging:Paging
}

type Paging = {
    skip:number
    limit:number
}

type QueryResult<T> = {
    data:T[]
    collectionSize:number
    reffedObjects:{[k:string]:{[s:string]:any}}
}

type PostResponse = {
    status:string
    insertedId:string
}