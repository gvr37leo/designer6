class PointerWidget extends Widget<string>{
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
        <div class="d-flex">
            <div class="" id='dropddowncontainer'></div>
        </div>`)

        this.dropdowncontainer = this.element.querySelector('#dropddowncontainer')
        var gotoButton = new Button('goto','btn-info attachcenter', () => {
            if(this.value.get() != null){
                designer.router.pushTrigger(`/${this.reffedObject.name}/${this.value.get()}`)
            }
        })
        this.element.appendChild(gotoButton.element)
        
        this.dropdownwidget = new DropdownWidget<any>('attachleft',(val) => {
            return val[this.dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(this.dropdownwidget.element)

        this.clearbutton = new Button('clear','btn-danger attachcenter',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','btn-success attachright',() => {
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
            }else{
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

    setOfflineDisplay(obj){

    }

    sync(){
        return getList(this.reffedObject.name,this.filter).then(data => {
            //faulty querys make getlist retun null and cause nullpointer exceptions
            this.dropdownwidget.loadOptions(data.data)
        })
    }
}