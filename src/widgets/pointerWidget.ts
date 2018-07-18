class PointerWidget extends Widget<string>{
    anchortag: HTMLAnchorElement;
    clearbutton: Button;
    dropdowncontainer: HTMLElement;
    attribute: PointerAttribute;
    createbutton: Button;
    dropdownwidget: DropdownWidget<any>;
    filter:Query
    reffedObject: ObjDef;
    dropdownattribute: Attribute;

    constructor(attribute:PointerAttribute){
        super()
        this.filter = {
            filter:{},
            paging:{
                limit:10,
                skip:0
            },
            sort:{},
        }
        this.attribute = attribute
        this.reffedObject = window.objidmap.get(attribute.pointsToObject)
        this.dropdownattribute = window.attributeidmap.get(this.reffedObject.dropdownAttributePointer)

        this.element = string2html(`
        <div class="ui action input">
            <div class="" id='dropddowncontainer'></div>
            <a class="ui button blue compact" href="/" >goto</a>
        </div>`)

        this.dropdowncontainer = this.element.querySelector('#dropddowncontainer')
        this.anchortag = this.element.querySelector('a')
        
        this.dropdownwidget = new DropdownWidget<any>('',(val) => {
            return val[this.dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(this.dropdownwidget.element)

        this.clearbutton = new Button('clear','red compact',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','green compact',() => {
            var createview = new DetailView(this.reffedObject).renderCreateView()
            window.globalModal.set(createview.element)
            window.globalModal.show()
            createview.onObjectCreated.listen((insertedId) => {
                this.value.set(insertedId)
                window.globalModal.hide()
            })
        })
        this.element.appendChild(this.createbutton.element)
      
        this.dropdownwidget.input.addEventListener('change', e => {
            this.filter.filter[this.dropdownattribute.name] = {$regex:this.dropdownwidget.input.value}
            this.sync()
        })

        this.dropdownwidget.value.onchange.listen(val => {
            this.value.set(val._id)
        })
        this.value.onchange.listen(val => {
            if(val == null){
                this.dropdownwidget.input.value = 'null'
                this.anchortag.href = ''
            }else{
                this.anchortag.href = `/${this.reffedObject.name}/${val}`
                get(this.reffedObject.name,this.value.get()).then(data => {
                    if(data == null){
                        this.dropdownwidget.input.value = 'nullptr'
                    }else{
                        this.dropdownwidget.value.set(data)
                    }
                })
            }
            
        })
        
        this.sync()
    }

    sync(){
        return getList(this.reffedObject.name,this.filter).then(data => {
            //faulty querys make getlist retun null and cause nullpointer exceptions
            this.dropdownwidget.loadOptions(data.data)
        })
    }
}