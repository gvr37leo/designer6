class PointerWidget extends Widget<string>{
    inputelement: HTMLInputElement;
    anchortag: HTMLAnchorElement;

    constructor(attribute:PointerAttribute){
        super()

        this.element = string2html(`
        <div>
            <input id="input" type="text"/>
            <a href="/" id="anchortag">goto</a>
        </div>`)
        this.inputelement = this.element.querySelector('#input') as HTMLInputElement
        this.anchortag = this.element.querySelector('#anchortag') as HTMLAnchorElement

        this.value.onchange.listen(val => {
            this.anchortag.href = `/${attribute.pointsToObject}/${this.value.get()}`
            this.inputelement.value = val
        })
    }
}