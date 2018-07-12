class IDWidget extends Widget<string>{
    inputelement: HTMLInputElement;
    anchortag: HTMLAnchorElement;
    
    constructor(attribute:IdentityAttribute){
        super()
        this.element = string2html(`
        <div style="display:flex; align-items:center;">
            <input class="form-control" id="input" type="text" readonly/>
            <a href="/" id="anchortag">goto</a>
        </div>`)
        this.inputelement = this.element.querySelector('#input') as HTMLInputElement
        this.anchortag = this.element.querySelector('#anchortag') as HTMLAnchorElement

        this.value.onchange.listen(val => {
            this.anchortag.href = `/${attribute.pointerType}/${this.value.get()}`
            this.inputelement.value = val
        })
    }
}