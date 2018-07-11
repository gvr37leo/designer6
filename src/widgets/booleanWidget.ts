/// <reference path="widget.ts" />


class BooleanWidget extends Widget<boolean>{
    element: HTMLElement;
    inputel: HTMLInputElement;
    constructor(){
        super()

        this.element = string2html('<div><input type="checkbox" /></div>')
        this.inputel = this.element.querySelector('input')

        this.element.addEventListener('change',(e) => {
            this.value.set(this.inputel.checked)
        })

        this.value.onchange.listen((val) => {
            this.inputel.checked = val
        })

        this.value.onClear.listen(() => {
            this.inputel.value = ''
        })

    }
}