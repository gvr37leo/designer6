class DropdownWidget<T> extends Widget<T>{
    displayer: (val: T) => string;
    options:T[]
    dropper: HTMLElement;

    constructor(displayer:(val:T) => string){
        super()
        this.displayer = displayer

        this.element = string2html(`
        <div class="ui fluid search selection dropdown">
            <input type="hidden" name="country">
            <i class="dropdown icon"></i>
            <div id="dropper" class="menu">
            
            </div>
        </div>`);
        this.dropper = this.element.querySelector('#dropper')

        this.value.onchange.listen(val => {
            // this.selectelement = displayer(val)
        })

        this.dropper.addEventListener('change',(e) => {
            // this.value.set(this.options[this.dropper.selectedIndex])
        })
    }

    loadOptions(options:T[]){
        this.options = options
        for(var option of options){
            this.dropper.appendChild(string2html(`<div class="item">${this.displayer(option)}</div>`) as HTMLElement)
        }
    }
}