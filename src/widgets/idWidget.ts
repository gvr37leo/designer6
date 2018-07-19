class IDWidget extends Widget<string>{
    inputelement: HTMLInputElement;
    
    constructor(attribute:IdentityAttribute){
        super()
        this.element = string2html(`
        <div class="input-group" style="display:flex; flex-wrap:nowrap;">
            <input class="form-control attachleft" id="input" type="text" readonly/>
        </div>`)
        this.inputelement = this.element.querySelector('#input') as HTMLInputElement
        var gotoButton = new Button('goto','btn-info attachright', () => {
            if(this.value.get() != null){
                designer.router.pushTrigger(`/${attribute.pointerType}/${this.value.get()}`)
            }
        })
        this.element.appendChild(gotoButton.element)
        this.value.onchange.listen(val => {
            this.inputelement.value = val
        })
    }
}