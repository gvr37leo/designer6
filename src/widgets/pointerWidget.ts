class PointerWidget extends Widget<string>{
    anchortag: HTMLAnchorElement;
    clearbutton: Button;
    dropdowncontainer: HTMLElement;
    attribute: PointerAttribute;
    createbutton: Button;

    constructor(attribute:PointerAttribute){
        super()
        this.attribute = attribute
        var reffedObject = window.objidmap.get(attribute.pointsToObject)
        var dropdownattribute = window.attributeidmap.get(reffedObject.dropdownAttributePointer)

        this.element = string2html(`
        <div style="display:flex; align-items:center;">
            <div id='dropddowncontainer'></div>
            <a href="/" >goto</a>
        </div>`)

        this.dropdowncontainer = this.element.querySelector('#dropddowncontainer')
        this.anchortag = this.element.querySelector('a')
        var dropdownwidget = new DropdownWidget<any>((val) => {
            return val[dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(dropdownwidget.element)

        this.clearbutton = new Button('clear','btn-danger',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','btn-success',() => {
            
        })
        this.element.appendChild(this.createbutton.element)
      
        dropdownwidget.value.onchange.listen(val => {
            this.value.set(val._id)
        })
        this.value.onchange.listen(val => {
            this.anchortag.href = `/${reffedObject.name}/${val}`
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