/// <reference path="table.ts" />
/// <reference path="../definition.ts" />


class GridView{
    objdef: ObjDef;
    element: HTMLElement;
    query:Query

    buttoncontainer: HTMLElement;
    tablecontainer: HTMLElement;
    table: Table<any>;
    dirtiedEvents: EventSystem<{}>[];
    skipwidget: RangeWidget;
    filterwidgetmap: Map<string, Widget<any>> = new Map();
    sortwidgetmap: Map<string, Widget<any>> = new Map();

    constructor(obj:ObjDef){
        this.objdef = obj
        this.query = {
            filter:{},
            sort:{},
            paging:{
                skip:0,
                limit:10
            }
        }
        this.element = string2html(`
        <div class="">
            <h1></h1>
            <div class="mb-3 d-flex" id="buttoncontainer"></div>
            <div class="" style="margin-top:10px;" id="tablecontainer"></div>
        </div>`)
        this.buttoncontainer = this.element.querySelector('#buttoncontainer')
        this.element.querySelector('h1').innerText = this.objdef.name
        this.tablecontainer = this.element.querySelector('#tablecontainer')
        this.addButton(new Button('create','btn-success attachleft',() => {
            var detailview = new DetailView(obj)
            detailview.renderCreateView()
            window.globalModal.set(detailview.element)
            window.globalModal.show()
            detailview.onObjectCreated.listen(createdId => {
                window.globalModal.hide()
                this.sync()
            })
        }))
        this.addButton(new Button('refresh','btn-info attachcenter', () => {
            this.sync()
        }))

        this.skipwidget = new RangeWidget()
        this.skipwidget.inputel.valueAsNumber = 0
        this.skipwidget.inputel.step = '1'
        this.buttoncontainer.appendChild(this.skipwidget.element)
        this.skipwidget.value.onchange.listen(v => {
            this.query.paging.skip = v
            this.sync()
        })
        

        this.table = this.createTable()
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
                this.filterwidgetmap.set(attribute._id,widget)
                let filterDirtiedEvent = new EventSystem()
                let changeTriggeredByResetButton = false;
                var deletebutton = new DisableableButton('X','btn-danger ml-3',filterDirtiedEvent,() => {
                    changeTriggeredByResetButton = true
                    widget.value.clear()
                    changeTriggeredByResetButton = false
                    delete this.query.filter[attribute.name]
                    this.sync()
                })
                

                widget.value.onchange.listen(val => {
                    this.query.filter[attribute.name] = val
                    if(changeTriggeredByResetButton == false){
                        filterDirtiedEvent.trigger(0)
                        this.sync()
                    }
                })
                var element = string2html('<div class="d-flex"></div>')
                element.appendChild(widget.element)
                element.appendChild(deletebutton.element)
                return element
            }))
        }
        columns.push(new Column('', (obj, i) => {
            var buttoncontainer = string2html('<div class="d-flex"></div>')
            var savebutton = new DisableableButton('save','btn-success attachleft', this.dirtiedEvents[i],() => {
                update(objdef.name,obj._id,obj).then(() => toastr.success('saved'))
            })
    
            var deletebutton = new Button('delete','btn-danger attachright',() => {
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
        return getList(this.objdef.name, this.query).then(res => {
            this.dirtiedEvents = res.data.map(v => new EventSystem())
            this.table.load(res.data)
            var max = Math.floor(res.collectionSize / this.query.paging.limit)
            this.skipwidget.inputel.max = max.toString()
            this.skipwidget.inputel.disabled = !max
            this.tablecontainer.appendChild(this.table.element)
        })
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }
}