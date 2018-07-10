class Table<T>{
    fieldRenderers: ((obj: T) => void)[];

    

    constructor(fieldRenderers:((obj:T) => void)[]){
        this.fieldRenderers = fieldRenderers
    }

    render(objects:T[]){
        for(var object of objects){
            for(var fieldRenderer of this.fieldRenderers){
                fieldRenderer(object)
            }
        }
    }

}

class Cat{
    name:string
    age:number
}

var table = new Table<Cat>([
    cat => {
        cat.name
    },
    cat => {
        cat.age
    }
])

table.render([new Cat(), new Cat()])