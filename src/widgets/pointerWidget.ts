class PointerWidget extends Widget<string>{
    anchortag: HTMLAnchorElement;
    clearbutton: HTMLButtonElement;
    dropdowncontainer: HTMLElement;
    attribute: PointerAttribute;
    createbutton: HTMLButtonElement;

    constructor(attribute:PointerAttribute){
        super()
        this.attribute = attribute
        var reffedObject = window.objidmap.get(attribute.pointsToObject)
        var dropdownattribute = window.attributeidmap.get(reffedObject.dropdownAttributePointer)

        this.element = string2html(`
        <div>
            <div id='dropddowncontainer'></div>
            <a href="/" >goto</a>
            <button id="clearbutton">clear</button>
            <button id="createbutton">create</button>
        </div>`)

        this.dropdowncontainer = this.element.querySelector('#dropddowncontainer')
        this.anchortag = this.element.querySelector('a')
        this.clearbutton = this.element.querySelector('#clearbutton')
        this.createbutton = this.element.querySelector('#createbutton')
        var dropdownwidget = new DropdownWidget<any>((val) => {
            return val[dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(dropdownwidget.element)

      
        this.clearbutton.addEventListener('click', () => {
            this.value.clear()
        })
        this.createbutton.addEventListener('click',() => {
            
        })
        
        getList(reffedObject.name,{
            filter:{},
            paging:{
                limit:10,
                skip:0
            },
            sort:{},
        }).then(data => {
            dropdownwidget.loadOptions(data.data)
        })
        

        
    }
}