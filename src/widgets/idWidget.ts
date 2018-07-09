class IDWidget extends Widget<string>{
    element: HTMLElement;
    inputelement: HTMLInputElement;
    anchortag: HTMLAnchorElement;
    constructor(anchor:HTMLElement, attribute:IdentityAttribute){
        super(anchor)

        var template = `
            <div>
                <input id="input" type="text" readonly/>
                <a href="/" id="anchortag">goto</a>
            </div>
        `
        this.element = createAndAppend(this.anchor,template)
        this.inputelement = this.element.querySelector('#input') as HTMLInputElement
        this.anchortag = this.element.querySelector('#anchortag') as HTMLAnchorElement

        this.value.onchange.listen(val => {
            this.anchortag.href = `/${attribute.pointerType}/${this.value.get()}`
            this.inputelement.value = val
        })
    }
}