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

function get(objname:string, id:string):Promise<any>{
    return getList(objname,{filter:{_id:id},sort:undefined,paging:{skip:0,limit:10}}).then(val => val.data[0])
}

function getList<T>(objname:string, query:Query):Promise<SearchResponse<T>>{
    return httpCall(`/api/search/${objname}`, {
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

declare class Query{
    filter:any
    sort:any
    paging:{
        skip:number,
        limit:number
    }
}

declare class SearchResponse<T>{
    data:T[]
    collectionSize:number
}

declare class PostResponse{
    status:string
    insertedId:string
}