/// <reference path="table.ts" />
/// <reference path="../definition.ts" />


class GridView{
    objdef: ObjDef;
    element: HTMLElement;
    filter:Query

    buttoncontainer: HTMLElement;
    tablecontainer: HTMLElement;

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

        }))

        getList(this.objdef.name, this.filter).then(objects => {
            var table = createTableForObject(this.objdef)
            table.load(objects.data)
            this.tablecontainer.appendChild(table.element)
        }) 
    }

    addButton(button:Button){
        this.buttoncontainer.appendChild(button.element)
    }
}