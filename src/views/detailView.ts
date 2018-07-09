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
    anchor: HTMLElement;
    data:any = {}
    element: HTMLElement;
    buttoncontainer: HTMLElement;
    widgetcontainer: HTMLElement;
    tabscontainer: HTMLElement;
    widgetmap: Map<string, Widget<any>>;
        



    constructor(anchor:HTMLElement, objdef:ObjDef){
        this.anchor = anchor;
        this.objdef = objdef
        this.widgetmap = new Map<string,Widget<any>>()
    }

    renderCreateView():DetailView{
        this.renderTemplate()

        this.renderWidgets(this.objdef)

        this.addButton(new Button('create','success', () => {
            create(this.objdef.name,this.data)
        }))

        return this
    }

    renderDetailView(id:string):DetailView{
        this.id = id
        this.renderTemplate()

        this.renderWidgets(this.objdef)
        get(this.objdef.name,this.id).then(data => {
            this.load(data)
        })

        this.addButton(new Button('save','success', () => {
            update(this.objdef.name,this.id,this.data)
        }))
        this.addButton(new Button('delete','warning', () => {
            del(this.objdef.name, this.id)
        }))
        this.addButton(new Button('refresh','info', () => {
            this.refresh()
        }))

        return this
    }

    renderTemplate(){
        this.element = createAndAppend(this.anchor,this.template)
        this.buttoncontainer = document.querySelector('#buttoncontainer')
        this.widgetcontainer = document.querySelector('#widgetcontainer')
        this.tabscontainer = document.querySelector('#tabscontainer')
    }

    renderWidgets(objdef:ObjDef){
        

        for(var attribute of objdef.attributes){
            if(attribute.dataType == 'array'){

            }else{
                var widget = createWidget(attribute,this.widgetcontainer)
                widget.value.onchange.listen(val => this.data[attribute.name] = val)
                this.widgetmap.set(attribute._id,widget)
            }
        }
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }

    refresh(){
        get(this.objdef.name,this.id).then(data => this.load(data)) 
    }

    load(data:any){
        this.data = data
        for(var attribute of this.objdef.attributes){
            var widget = this.widgetmap.get(attribute._id)
            widget.value.set(this.data[attribute.name])
        }
    }

}