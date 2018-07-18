class NumberWidget extends Widget<number>{
    inputel: HTMLInputElement;
    
    constructor(){
        super()
        this.element = string2html('<div class=""><input class="form-control" type="number" /></div>')
        this.inputel = this.element.querySelector('input')

        this.element.addEventListener('change',(e) => {
            this.value.set(this.inputel.valueAsNumber)
        })

        this.value.onchange.listen((val) => {
            this.inputel.valueAsNumber = val
        })

        this.value.onClear.listen(() => {
            this.inputel.value = ''
        })
    }
}