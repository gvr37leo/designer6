/// <reference path="../../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="../localUtils.ts" />


class Table<T>{
    columns: Column<T>[];
    orderDesc:Box<boolean>;
    orderedColumn:Box<number>;

    element: HTMLTableElement;
    head: HTMLTableSectionElement;
    body: HTMLTableSectionElement;
    titlerow: HTMLTableRowElement;
    filterrow: HTMLTableRowElement;

    

    constructor(columns:Column<T>[]){
        this.columns = columns
        this.element = string2html(`
            <table>
                <thead>
                    <tr id="titlerow"></tr>
                    <tr id="filterrow"></tr>
                </thead>
                <tbody></tbody>
            </table>`) as HTMLTableElement
        this.head = this.element.querySelector('thead')
        this.titlerow = this.head.querySelector('#titlerow')
        this.filterrow = this.head.querySelector('#filterrow')
        this.body = this.element.querySelector('tbody')
        this.addHeader()
    }

    addHeader(){
        for(var column of this.columns){
            var cell = this.createTableCell(this.titlerow)
            cell.innerText = column.name

            var cell2 = this.createTableCell(this.filterrow)
            cell2.appendChild(column.filterRenderer())
        }
    }

    load(objects:T[]){

        for(var object of objects){
            var row = document.createElement('tr')
            this.body.appendChild(row)            
            for(var column of this.columns){
                var cell = document.createElement('td')
                row.appendChild(cell)
                cell.appendChild(column.renderer(object))
            }
        }
    }

    private createTableCell(row){
        var td = document.createElement('td')
        row.appendChild(td)
        return td
    }

}

class Column<T>{
    name:string
    renderer:(obj:T) => HTMLElement
    filterRenderer:() => HTMLElement

    constructor(name:string, renderer:(obj:T) => HTMLElement,filterRenderer:() => HTMLElement){
        this.name = name
        this.renderer = renderer
        this.filterRenderer = filterRenderer
    }
}