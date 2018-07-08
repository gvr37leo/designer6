/// <reference path="../../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="widget.ts" />

/// <reference path="../localUtils.ts" />

class TextWidget extends Widget<string>{
    inputel: HTMLInputElement;

    constructor(anchor:HTMLElement){
        super(anchor)

        this.inputel = createAndAppend(this.anchor,'<input>') as HTMLInputElement

        this.inputel.addEventListener('input',(e) => {
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