/// <reference path="../../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="widget.ts" />
/// <reference path="../localUtils.ts" />

class TextWidget extends Widget<string>{
    inputel: HTMLInputElement;

    constructor(){
        super()
        this.element = string2html('<div class=""><input class="form-control" /></div>')
        this.inputel = this.element.querySelector('input')

        this.element.addEventListener('change',(e) => {
            this.value.set(this.inputel.value)
        })

        this.value.onchange.listen((val) => {
            this.inputel.value = val
        })

        this.value.onClear.listen(() => {
            this.inputel.value = ''
        })
    }
}