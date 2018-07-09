/// <reference path="widget.ts" />


class DateWidget extends Widget<number>{
    element: HTMLElement;
    constructor(anchor:HTMLElement){
        super(anchor)

        var template = `
            <input type="datetime-local" />
        `

        this.element = createAndAppend(this.anchor,template)
    }
}