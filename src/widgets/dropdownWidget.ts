class DropdownWidget<T> extends Widget<T>{
    displayer: (val: T) => string;
    options:T[]
    selectelement: HTMLSelectElement;

    constructor(displayer:(val:T) => string){
        super()
        this.displayer = displayer

        this.element = string2html(`
        <div>
            <select></select>
        </div>`);
        this.selectelement = this.element.querySelector('select')

        this.selectelement.addEventListener('change',(e) => {
            this.value.set(this.options[this.selectelement.selectedIndex])
        })
    }

    loadOptions(options:T[]){
        this.options = options
        for(var option of options){
            this.selectelement.add(string2html(`<option>${this.displayer(option)}</option>`) as HTMLOptionElement)
        }
    }
}