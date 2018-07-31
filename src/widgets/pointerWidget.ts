class PointerWidget extends Widget<string>{
    clearbutton: Button;
    dropdowncontainer: HTMLElement;
    attribute: PointerAttribute;
    createbutton: Button;
    dropdownwidget: DropdownWidget<any>;
    query:Query
    reffedObject: ObjDef;
    dropdownattribute: Attribute;
    private offlineMode: boolean;

    constructor(attribute:PointerAttribute){
        super()
        this.query = {
            filter:{},
            paging:{
                limit:10,
                skip:0
            },
            sort:{},
            reffedAttributes:[]
        }
        this.attribute = attribute
        this.reffedObject = objidmap.get(attribute.pointsToObject)
        this.dropdownattribute = attributeidmap.get(this.reffedObject.dropdownAttributePointer)

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
            if(val == null){
                return 'null'
            }
            return val[this.dropdownattribute.name]
        })
        this.dropdowncontainer.appendChild(this.dropdownwidget.element)

        this.clearbutton = new Button('clear','btn-danger attachcenter',() => {
            this.value.clear()
        })
        this.element.appendChild(this.clearbutton.element)

        this.createbutton = new Button('create','btn-success attachright',() => {
            var createview = new DetailView(this.reffedObject).renderCreateView()
            globalModal.set(createview.element)
            globalModal.show()
            createview.onObjectCreated.listen((insertedId) => {
                this.value.set(insertedId)
                globalModal.hide()
            })
        })
        this.element.appendChild(this.createbutton.element)
      
        this.dropdownwidget.input.addEventListener('change', e => {
            this.query.filter[this.dropdownattribute.name] = {$regex:this.dropdownwidget.input.value}
            this.sync()
        })

        this.dropdownwidget.value.onchange.listen(val => {
            if(val == null){
                this.value.set(null)
            }else{
                this.value.set(val._id)
            }
        })
        this.value.onchange.listen(val => {
            if(val == null){
                this.dropdownwidget.input.value = 'null'
            }else{
                if(!this.offlineMode){
                    get(this.reffedObject,this.value.get()).then(res => {
                        var data = res.data[0]
                        if(data == null){
                            this.dropdownwidget.input.value = 'nullptr'
                        }else{
                            this.dropdownwidget.value.set(data)
                        }
                    })
                }
            }
        })
        
        //maybe call setofflinedisplay from here
        // this.setOfflineDisplay(df,prefetchedCollections.get(objidmap.get(attribute.pointsToObject).name))
    }

    setOfflineDisplay(selectedValue:any,unfilteredoptions:any[]){
        this.offlineMode = true
        this.dropdownwidget.value.set(selectedValue)
        this.offlineMode = false
        this.dropdownwidget.loadOptions(unfilteredoptions)
    }

    sync(){
        return getList(this.reffedObject.name,this.query).then(data => {
            //faulty querys make getlist retun null and cause nullpointer exceptions
            this.dropdownwidget.loadOptions(data.data)
        })
    }
}