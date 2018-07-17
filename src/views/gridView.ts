/// <reference path="table.ts" />
/// <reference path="../definition.ts" />


class GridView{
    objdef: ObjDef;
    element: HTMLElement;
    filter:Query

    buttoncontainer: HTMLElement;
    tablecontainer: HTMLElement;
    table: Table<any>;
    dirtiedEvents: EventSystem<{}>[];
    lazySync:() => Promise<any>

    constructor(obj:ObjDef){
        this.objdef = obj
        this.filter = {
            filter:{},
            sort:{},
            paging:{
                skip:0,
                limit:10
            }
        }
        this.element = string2html(`
        <div class="">
            <div class="ui buttons" id="buttoncontainer"></div>
            <div class="" style="margin-top:10px;" id="tablecontainer"></div>
        </div>`)
        this.buttoncontainer = this.element.querySelector('#buttoncontainer')
        this.tablecontainer = this.element.querySelector('#tablecontainer')
        this.addButton(new Button('create','green',() => {
            var detailview = new DetailView(obj)
            detailview.renderCreateView()
            window.globalModal.set(detailview.element)
            window.globalModal.show()
            detailview.onObjectCreated.listen(createdId => {
                window.globalModal.hide()
                this.sync()
            })
        }))
        this.addButton(new Button('refresh','blue', () => {
            this.sync()
        }))
        // this.table = createTableForObject(this.objdef)
        this.table = this.createTable()
        this.sync()
    }

    createTable():Table<any>{
        var columns:Column<any>[] = []
        var objdef = this.objdef
        var attributes = getAllAttributes(this.objdef)
        var table;
        for(let attribute of attributes){
            columns.push(new Column(attribute.name, (obj, i) => {
                var widget = createWidget(attribute)
                widget.value.set(obj[attribute.name])
                widget.value.onchange.listen(val => {
                    obj[attribute.name] = val
                    this.dirtiedEvents[i].trigger(0)
                })
                return widget.element
            }, () => {

                var widget = createWidget(attribute)
                let filterDirtiedEvent = new EventSystem()
                let changeTriggeredByResetButton = false;
                var deletebutton = new DisableableButton('X','red',filterDirtiedEvent,() => {
                    changeTriggeredByResetButton = true
                    widget.value.clear()
                    changeTriggeredByResetButton = false
                    delete this.filter.filter[attribute.name]
                    this.sync()
                })

                widget.element.appendChild(deletebutton.element)

                widget.value.onchange.listen(val => {
                    this.filter.filter[attribute.name] = val
                    if(changeTriggeredByResetButton == false){
                        filterDirtiedEvent.trigger(0)
                        this.sync()
                    }
                })
                

                return widget.element
            }))
        }
        columns.push(new Column('', (obj, i) => {
            var buttoncontainer = string2html('<div class="ui buttons"></div>')
            var savebutton = new DisableableButton('save','green', this.dirtiedEvents[i],() => {
                update(objdef.name,obj._id,obj).then(() => toastr.success('saved'))
            })
    
            var deletebutton = new Button('delete','red',() => {
                del(objdef.name, obj._id).then(() => {
                    this.sync()
                    toastr.error('deleted')
                })
            })
            buttoncontainer.appendChild(savebutton.element)
            buttoncontainer.appendChild(deletebutton.element)
            return buttoncontainer
        },() => {
            return document.createElement('div')
        }))
        table = new Table(columns)
        return table
    }

    sync():Promise<any>{
        return getList(this.objdef.name, this.filter).then(objects => {
            this.dirtiedEvents = objects.data.map(v => new EventSystem())
            this.table.load(objects.data)
            this.tablecontainer.appendChild(this.table.element)
        })
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }
}