/// <reference path="definition.ts" />


function create(pointertype:string, data:any){
    return httpCall(`/api/search/${pointertype}`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
    })
}

function get(pointertype:string, id:string):Promise<any>{
    return getList(pointertype,{filter:{_id:id},sort:undefined,paging:{skip:0,limit:10}})
}

function getList(pointertype:string, query:Query):Promise<any>{
    return httpCall(`/api/search/${pointertype}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(query)
    })
}

function update(pointertype:string, id:string, data:any){
    return httpCall(`/api/${pointertype}/${id}`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'PUT',
        body:JSON.stringify(data)
    })
}

function del(pointertype:string, id:string){
    return httpCall(`/api/${pointertype}/${id}`,{
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