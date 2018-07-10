class GridView{
    objdef: ObjDef;
    element: HTMLElement;
    
    constructor(objdef:ObjDef){
        this.element = string2html('')
        this.objdef = objdef
    }

    render():GridView{

        return this
    }

    load(objects:any[]){

    }
}