/// <reference path="../definition.ts" />
/// <reference path="../button.ts" />
/// <reference path="tabs.ts" />


class DetailView{

    objdef:ObjDef
    template:string = `
    <div id="detailview" class="">
        <h1></h1>
        <div id="buttoncontainer" class="btn-group mb-3">
        </div>
        <div>
            <div id="widgetcontainer" style="border: 1px solid #dededf; padding: 10px; border-radius: 5px;" class="mb-3 d-inline-flex flex-column">
            </div>
        </div>

        <div id="tabscontainer" class="">
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
    dirtiedEvent: EventSystem<number>;
    header: HTMLHeadingElement;
        



    constructor(objdef:ObjDef){
        this.objdef = objdef
        this.widgetmap = new Map<string,Widget<any>>()
    }

    renderCreateView():DetailView{
        this.onObjectCreated = new EventSystem()
        this.renderTemplate()

        this.renderWidgets(this.objdef.attributes)

        this.addButton(new Button('create','btn-success', () => {
            create(this.objdef.name,this.data).then(val => {
                this.onObjectCreated.trigger(val.insertedId)
            })
        }))
        this.addButton(new Button('up', 'btn-info',() => {
            window.location.pathname = `/${this.objdef.name}`
        }))

        return this
    }

    renderDetailView(id:string):DetailView{
        this.renderTemplate()
        if(this.objdef.referencedAttributes.length > 0){
            this.tabs = new Tabs(this.tabscontainer)
        }
        this.dirtiedEvent = new EventSystem<number>()
        this.renderWidgets(this.objdef.passiveAttributes.concat(this.objdef.attributes))

        var savebutton = new DisableableButton('save','btn-success',this.dirtiedEvent,() => {
            update(this.objdef.name,id,this.data)
            toastr.success('saved')
        })
        this.addButton(savebutton)
        this.addButton(new Button('delete','btn-danger',() => {
            del(this.objdef.name, id).then(() => {
                designer.router.pushTrigger(`/${this.objdef.name}`)
            })
            toastr.error('deleted')
        }))
        this.addButton(new Button('refresh','btn-info', () => {
            this.refresh(id).then(v => {
                savebutton.element.disabled = true
            })
        }))
        this.addButton(new Button('up', 'btn-info',() => {
            designer.router.pushTrigger(`/${this.objdef.name}`)
        }))

        this.addTablesToTabs(this.objdef,id)
        if(this.objdef.referencedAttributes.length > 0){
            this.tabs.selectTab(this.objdef.referencedAttributes[0]._id)
        }

        get(this.objdef.name,id).then(val => {
            if(val == null){
                //nullptr 404
            }else{
                this.load(val)
                for(var widget of this.widgetmap.values()){
                    widget.value.onchange.listen(() => {
                        this.dirtiedEvent.trigger(0)
                    })
                }
            }
            
        })

        return this
    }

    renderTemplate(){
        this.element = string2html(this.template)
        this.buttoncontainer = this.element.querySelector('#buttoncontainer')
        this.widgetcontainer = this.element.querySelector('#widgetcontainer')
        this.tabscontainer = this.element.querySelector('#tabscontainer')
        this.header = this.element.querySelector('h1')
        this.header.innerText = this.objdef.name
    }

    renderWidgets(attributes:Attribute[]){
        for(let attribute of attributes){
            var widget = createWidget(attribute)
            var field = createAndAppend(this.widgetcontainer,`<div class="field"><label>${attribute.name}</label><div id="valuecontainer"></div></div>`)
            var valuecontainer = field.querySelector('#valuecontainer')
            valuecontainer.appendChild(widget.element)
            widget.value.onchange.listen(val => this.data[attribute.name] = val)
            this.widgetmap.set(attribute._id,widget)
        }
    }

    addTablesToTabs(objdef:ObjDef,id:string){
        for(let referencedAttribute of objdef.referencedAttributes){
            let ownerOfReferencedAttribute:ObjDef = window.objidmap.get(referencedAttribute.belongsToObject)
            
            this.tabs.addTab(referencedAttribute._id,`${ownerOfReferencedAttribute.name} : ${referencedAttribute.name}`, () => {
                var gridview = new GridView(ownerOfReferencedAttribute)
                gridview.filterwidgetmap.get(referencedAttribute._id).value.set(id)
                gridview.onCreateViewInstantiated.listen(createView => {
                    createView.widgetmap.get(referencedAttribute._id).value.set(this.data._id)
                })
                gridview.sync()
                return gridview.element
            })
            
        }
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }

    refresh(id){
        return get(this.objdef.name,id).then(data => this.load(data)) 
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