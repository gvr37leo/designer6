/// <reference path="../../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="widget.ts" />
/// <reference path="../localUtils.ts" />

class EnumWidget extends Widget<string>{
    inputel: HTMLInputElement;
    dropdownwidget: DropdownWidget<string>;

    constructor(attribute:EnumAttribute){
        super()
        this.element = string2html('<div class=""></div>')
        this.dropdownwidget = new DropdownWidget<string>('',v => v)
        this.dropdownwidget.loadOptions(attribute.options)
        this.element.appendChild(this.dropdownwidget.element)
        this.value = this.dropdownwidget.value
    }
}