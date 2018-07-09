/// <reference path="widget.ts" />


class BooleanWidget extends Widget<boolean>{
    element: HTMLElement;
    constructor(anchor:HTMLElement){
        super(anchor)

        var template = `
            <input type="checkbox" />
        `

        this.element = createAndAppend(this.anchor,template)
    }
}