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
    data:any = {}
    widgetmap: Map<string, Widget<any>>;
    tabs: Tabs;
    onObjectCreated:EventSystem<string>

    element: HTMLElement;
    buttoncontainer: HTMLElement;
    widgetcontainer: HTMLElement;
    tabscontainer: HTMLElement;
        



    constructor(objdef:ObjDef){
        this.objdef = objdef
        this.widgetmap = new Map<string,Widget<any>>()
    }

    renderCreateView():DetailView{
        this.onObjectCreated = new EventSystem()
        this.renderTemplate()

        this.renderWidgets(this.objdef.attributes)

        this.addButton(new Button('create','success', () => {
            create(this.objdef.name,this.data).then(val => {
                this.onObjectCreated.trigger(val.insertedId)
            })
        }))
        this.addButton(new Button('up', 'info',() => {
            window.location.pathname = `/${this.objdef.name}`
        }))

        return this
    }

    renderDetailView(id:string):DetailView{
        this.renderTemplate()
        this.tabs = new Tabs(this.tabscontainer)

        this.renderWidgets(this.objdef.passiveAttributes.concat(this.objdef.attributes))

        
        this.addButton(createSaveButton(this.objdef,id,this.data))
        this.addButton(createDeleteButton(this.objdef,id))
        
        this.addButton(new Button('refresh','info', () => {
            this.refresh(id)
        }))
        this.addButton(new Button('up', 'info',() => {
            window.location.pathname = `/${this.objdef.name}`
        }))

        this.renderTables(this.objdef)

        return this
    }

    renderTemplate(){
        this.element = string2html(this.template)
        this.buttoncontainer = this.element.querySelector('#buttoncontainer')
        this.widgetcontainer = this.element.querySelector('#widgetcontainer')
        this.tabscontainer = this.element.querySelector('#tabscontainer')
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
            let ownerOfReferencedAttribute:ObjDef = window.objidmap.get(referencedAttribute.belongsToObject)
            
            this.tabs.addTab(referencedAttribute.name, () => {
                let table = createTableForObject(ownerOfReferencedAttribute)
                getList(ownerOfReferencedAttribute.name,{
                    filter:{
                        _id:this.data[referencedAttribute.name]
                    },
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
        var attributes = getAllAttributes(this.objdef)
        for(var attribute of attributes){
            var widget = this.widgetmap.get(attribute._id)
            widget.value.set(this.data[attribute.name])
        }
    }

}