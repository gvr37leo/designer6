/// <reference path="table.ts" />
/// <reference path="../definition.ts" />
/// <reference path="../widgets/clearableWidget.ts" />


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
    onCreateViewInstantiated:EventSystem<DetailView> = new EventSystem()

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
            var createDetailview = new DetailView(obj)
            createDetailview.renderCreateView()
            this.onCreateViewInstantiated.trigger(createDetailview)
            window.globalModal.set(createDetailview.element)
            window.globalModal.show()
            createDetailview.onObjectCreated.listen(createdId => {
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
            this.query.paging.skip = v * this.query.paging.limit
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
            
            columns.push(new Column([() => {
                var element = string2html(`
                <div class="showhim" style="display:flex; justify-content: space-between; align-items: center;">
                    <div>${attribute.name}</div>
                    <div class="showme">
                        <div id="asc"><i class="fas fa-angle-up"></i></div>
                        <div id="desc"><i class="fas fa-angle-down"></i></div>
                    </div>
                </div>`)
                var asc = element.querySelector('#asc')
                var desc = element.querySelector('#desc')
                asc.addEventListener('click',e => {
                    var sort = {}
                    sort[attribute.name] = 1
                    this.query.sort = sort
                    this.sync()
                })

                desc.addEventListener('click', e => {
                    var sort = {}
                    sort[attribute.name] = -1
                    this.query.sort = sort
                    this.sync()
                })

                return element
            },() => {

                var widget = createFilterWidget(attribute)
                this.filterwidgetmap.set(attribute._id,widget)
                let changeTriggeredByUser = true;
                var clearablewidget = new ClearableWidget(widget)
                clearablewidget.clearbutton.callback = () => {
                    changeTriggeredByUser = false
                    widget.value.clear()
                    changeTriggeredByUser = true
                    clearablewidget.clearbutton.element.disabled = true
                    delete this.query.filter[attribute.name]
                    this.sync()    
                }
                

                widget.value.onchange.listen(val => {
                    if(changeTriggeredByUser == true){
                        this.query.filter[attribute.name] = val
                        this.sync()
                    }
                })
                return clearablewidget.element
            }],(obj, i) => {
                var widget = createWidget(attribute)
                widget.value.set(obj[attribute.name])
                widget.value.onchange.listen(val => {
                    obj[attribute.name] = val
                    this.dirtiedEvents[i].trigger(0)
                })
                return widget.element
            }))
        }
        
        columns.push(new Column([() => {
            return document.createElement('div')
        },() => {
            return document.createElement('div')
        }],(obj, i) => {
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