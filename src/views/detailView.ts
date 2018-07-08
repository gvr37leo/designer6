/// <reference path="../definition.ts" />
/// <reference path="../button.ts" />


class DetailView{

    objdef:ObjDef
    template:string = `
    <div id="detailview">
        <div id="buttoncontainer">
        </div>

        <div id="widgetcontainer">
        </div>

        <div id="tabscontainer">
        </div>
    </div>
    `
    id: string;
        



    constructor(anchor:HTMLElement, objdef:ObjDef, id:string){
        this.objdef = objdef
        this.id = id
    }

    renderDetailView():DetailView{

        this.renderWidgets(this.objdef)

        this.addButton(new Button('save','', () => {

        }))
        this.addButton(new Button('delete','', () => {
            
        }))
        this.addButton(new Button('','', () => {
            
        }))

        return this
    }

    renderCreateView():DetailView{

        this.renderWidgets(this.objdef)

        this.addButton(new Button('create','', () => {
            
        }))

        return this
    }

    renderWidgets(objdef:ObjDef){
        for(var attribute of objdef.attributes){
            createWidget(attribute)
        }
    }

    addButton(button:Button){

    }

    load(obj:any){

    }

    create(){

    }

    remove(){

    }

}