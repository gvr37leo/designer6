/// <reference path="widget.ts" />
/// <reference path="../localUtils.ts" />
/// <reference path="../button.ts" />


class ClearableWidget<T> extends Widget<T>{
    clearcontainer: HTMLElement;
    widgetcontainer: HTMLElement;
    widget: Widget<T>;
    clearbutton: Button;

    constructor(widget:Widget<T>){
        super()
        this.widget = widget
        this.value = widget.value
        
    
        this.element = string2html(`
        <div class="" style="display:flex; flex-wrap:nowrap; align-items: center;">
            <div id="widgetcontainer"></div>
            <div class="ml-3" id="clearcontainer"></div>
        </div>`)

        this.widgetcontainer = this.element.querySelector('#widgetcontainer')
        this.clearcontainer = this.element.querySelector('#clearcontainer')
        this.widgetcontainer.appendChild(widget.element)

        this.clearbutton = new DisableableButton('X','btn-danger',this.widget.value.onchange,() => {
            this.widget.value.clear()
        })
        this.clearcontainer.appendChild(this.clearbutton.element)
    }
}