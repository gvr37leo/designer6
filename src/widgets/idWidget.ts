class IDWidget extends Widget<string>{
    inputelement: HTMLInputElement;
    anchortag: HTMLAnchorElement;
    
    constructor(attribute:IdentityAttribute){
        super()
        this.element = string2html(`
        <div class="ui action input">
            <input class="" id="input" type="text" readonly/>
            <a class="ui button blue" href="/" id="anchortag">goto</a>
        </div>`)
        this.inputelement = this.element.querySelector('#input') as HTMLInputElement
        this.anchortag = this.element.querySelector('#anchortag') as HTMLAnchorElement

        this.value.onchange.listen(val => {
            this.anchortag.href = `/${attribute.pointerType}/${this.value.get()}`
            this.inputelement.value = val
        })
    }
}