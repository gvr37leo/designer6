/// <reference path="table.ts" />
/// <reference path="../definition.ts" />


class GridView{
    objdef: ObjDef;
    element: HTMLElement;
    filter:Query

    buttoncontainer: HTMLElement;
    tablecontainer: HTMLElement;
    table: Table<any>;

    constructor(obj:ObjDef){
        this.objdef = obj
        this.filter = {
            filter:'',
            sort:'',
            paging:{
                skip:0,
                limit:10
            }
        }
        this.element = string2html(`
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col">
                    <div id="buttoncontainer"></div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col" id="tablecontainer"></div>
            </div>
        </div>`)
        this.buttoncontainer = this.element.querySelector('#buttoncontainer')
        this.tablecontainer = this.element.querySelector('#tablecontainer')
        this.addButton(new Button('create','btn-success',() => {
            var detailview = new DetailView(obj)
            detailview.renderCreateView()
            window.globalModal.set(detailview.element)
            window.globalModal.show()
            detailview.onObjectCreated.listen(createdId => {
                window.globalModal.hide()
                this.sync()
            })
        }))
        this.addButton(new Button('refresh','btn-info', () => {
            this.sync()
        }))
        this.table = createTableForObject(this.objdef)

        this.sync()
    }

    sync(){
        getList(this.objdef.name, this.filter).then(objects => {
            this.table.load(objects.data)
            this.tablecontainer.appendChild(this.table.element)
        })
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }
}