/// <reference path="../definition.ts" />
/// <reference path="../button.ts" />
/// <reference path="tabs.ts" />


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
    anchor: HTMLElement;
    data:any = {}
    widgetmap: Map<string, Widget<any>>;
    tabs: Tabs;

    element: HTMLElement;
    buttoncontainer: HTMLElement;
    widgetcontainer: HTMLElement;
    tabscontainer: HTMLElement;
        



    constructor(anchor:HTMLElement, objdef:ObjDef){
        this.anchor = anchor;
        this.objdef = objdef
        this.widgetmap = new Map<string,Widget<any>>()
    }

    renderCreateView():DetailView{
        this.renderTemplate()

        this.renderWidgets(this.objdef.attributes)

        this.addButton(new Button('create','success', () => {
            create(this.objdef.name,this.data)
        }))

        return this
    }

    renderDetailView(id:string):DetailView{
        this.renderTemplate()
        this.tabs = new Tabs(this.tabscontainer)

        this.renderWidgets(this.objdef.passiveAttributes.concat(this.objdef.attributes))

        this.addButton(new Button('save','success', () => {
            update(this.objdef.name,id,this.data)
        }))
        this.addButton(new Button('delete','warning', () => {
            del(this.objdef.name, id)
        }))
        this.addButton(new Button('refresh','info', () => {
            this.refresh(id)
        }))

        this.renderTables(this.objdef)

        return this
    }

    renderTemplate(){
        this.element = createAndAppend(this.anchor,this.template)
        this.buttoncontainer = document.querySelector('#buttoncontainer')
        this.widgetcontainer = document.querySelector('#widgetcontainer')
        this.tabscontainer = document.querySelector('#tabscontainer')
    }

    renderWidgets(attributes:Attribute[]){
        for(let attribute of attributes){
            var widget = createWidget(attribute)
            var field = createAndAppend(this.widgetcontainer,`<div><b>${attribute.name}</b><span id="valuecontainer"></span></div>`)
            var valuecontainer = field.querySelector('#valuecontainer')
            valuecontainer.appendChild(widget.element)
            widget.value.onchange.listen(val => this.data[attribute.name] = val)
            this.widgetmap.set(attribute._id,widget)
        }
    }

    renderTables(objdef:ObjDef){
        for(let referencedAttribute of objdef.referencedAttributes){
            var ownerOfReferencedAttribute:ObjDef = window.objidmap.get(referencedAttribute.belongsToObject)
            
            this.tabs.addTab(referencedAttribute.name, () => {
                var table = createTableForObject(ownerOfReferencedAttribute)
                getList(ownerOfReferencedAttribute.name,{
                    filter:{},
                    paging:{
                        limit:10,
                        skip:0
                    },
                    sort:{},
                }).then(data => {
                    table.load(data.data)
                })
                return table.element
            })
            
        }
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }

    refresh(id){
        get(this.objdef.name,id).then(data => this.load(data)) 
    }

    load(data:any){
        this.data = data
        for(var attribute of this.objdef.attributes){
            var widget = this.widgetmap.get(attribute._id)
            widget.value.set(this.data[attribute.name])
        }
        for(var attribute of this.objdef.passiveAttributes){
            this.w
        }
    }

}