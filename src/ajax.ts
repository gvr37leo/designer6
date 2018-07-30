/// <reference path="definition.ts" />


function create(objname:string, data:any):Promise<PostResponse>{
    return httpCall(`/api/${objname}`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
    })
}


function get(objdef:ObjDef, id:string){
    objdef.attributes
    return getList(objdef.name,{
        filter:{
            _id:id,
        },
        paging:{
            limit:0,
            skip:0,
        },
        sort:{},
        reffedAttributes:objdef.genReffedAttributes()
    })
}

function getList<T>(objname:string, query:Query):Promise<QueryResult<T>>{
    return httpCall(`/api/refsearch/${objname}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(query)
    })
}

function update(objname:string, id:string, data:any){
    return httpCall(`/api/${objname}/${id}`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'PUT',
        body:JSON.stringify(data)
    })
}

function del(objname:string, id:string){
    return httpCall(`/api/${objname}/${id}`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'DELETE',
    })
}

function httpCall(url,params){
    var promise = fetch(url,params)
    .then(res => res.json())
    return promise
}


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