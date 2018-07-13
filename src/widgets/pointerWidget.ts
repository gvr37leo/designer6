class PointerWidget extends Widget<string>{
    anchortag: HTMLAnchorElement;
    clearbutton: Button;
    dropdowncontainer: HTMLElement;
    attribute: PointerAttribute;
    createbutton: Button;
    dropdownwidget: DropdownWidget<any>;

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
        this.dropdownwidget = new DropdownWidget<any>((val) => {
            return val[dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(this.dropdownwidget.element)

        this.clearbutton = new Button('clear','btn-danger',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','btn-success',() => {
            
        })
        this.element.appendChild(this.createbutton.element)
      
        this.dropdownwidget.value.onchange.listen(val => {
            this.value.set(val._id)
        })
        this.value.onchange.listen(val => {
            this.anchortag.href = `/${reffedObject.name}/${val}`
            get(reffedObject.name,this.value.get()).then(val => {
                if(val == null){
                    //set display to nullptr
                }else{
                    this.dropdownwidget.value.set(val)
                }
            })
            
        })
        
        getList(reffedObject.name,{
            filter:{},
            paging:{
                limit:10,
                skip:0
            },
            sort:{},
        }).then(data => {
            this.dropdownwidget.loadOptions(data.data)
        })
        

        
    }
}