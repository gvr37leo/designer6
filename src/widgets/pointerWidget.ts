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
        <div class="ui action input">
            <div class="" id='dropddowncontainer'></div>
            <a class="ui button blue compact" href="/" >goto</a>
        </div>`)

        this.dropdowncontainer = this.element.querySelector('#dropddowncontainer')
        this.anchortag = this.element.querySelector('a')
        this.dropdownwidget = new DropdownWidget<any>('',(val) => {
            return val[dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(this.dropdownwidget.element)

        this.clearbutton = new Button('clear','red compact',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','green compact',() => {
            
        })
        this.element.appendChild(this.createbutton.element)
      
        this.dropdownwidget.value.onchange.listen(val => {
            this.value.set(val._id)
        })
        this.value.onchange.listen(val => {
            if(val == null){
                this.dropdownwidget.input.value = 'null'
                this.anchortag.href = ''
            }else{
                this.anchortag.href = `/${reffedObject.name}/${val}`
                get(reffedObject.name,this.value.get()).then(data => {
                    if(data == null){
                        this.dropdownwidget.input.value = 'nullptr'
                    }else{
                        this.dropdownwidget.value.set(data)
                    }
                })
            }
            
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