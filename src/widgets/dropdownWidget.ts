class DropdownWidget<T> extends Widget<T>{
    displayer: (val: T) => string;
    options:T[]
    dropper: HTMLElement;
    input: HTMLInputElement;


    constructor(classes:string, displayer:(val:T) => string){
        super()
        this.displayer = displayer

        this.element = string2html(`
            <div class="ui input dropdownel">
                <input class="dropinput ${classes}"/>
                <div id="dropper" class="dropper"></div>
            </div>
            `);
        this.input = this.element.querySelector('input')
        this.dropper = this.element.querySelector('#dropper')

        this.input.addEventListener('focus',() => {
            this.dropper.style.display = 'block'
        })

        window.addEventListener('mousedown', (event) => {
            if (event.target != this.input && this.dropper.contains(event.target as Node) == false) {
                this.dropper.style.display = 'none'
            }
        })

        this.value.onchange.listen(val => {
            this.input.value = displayer(val)
        })
    }

    loadOptions(options:T[]){
        this.options = options
        for(let option of options){
            let element = string2html(`<div class="drop">${this.displayer(option)}</div>`) as HTMLElement
            element.addEventListener('click', () => {
                this.value.set(option)
                this.dropper.style.display = 'none'
            })
            this.dropper.appendChild(element)
        }
    }
}