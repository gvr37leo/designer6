/// <reference path="../../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="widget.ts" />
/// <reference path="../localUtils.ts" />

class TextFilterWidget extends Widget<{$regex:string}>{
    inputel: HTMLInputElement;

    constructor(){
        super()
        this.element = string2html('<div class=""><input class="form-control" /></div>')
        this.inputel = this.element.querySelector('input')

        this.element.addEventListener('change',(e) => {
            this.value.set({$regex:this.inputel.value})
        })

        this.value.onchange.listen((val) => {
            if(val == null){
                this.inputel.value = ''
            }else{
                this.inputel.value = val.$regex
            }
        })

        this.value.onClear.listen(() => {
            this.inputel.value = ''
        })
    }
}