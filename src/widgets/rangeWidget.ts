class RangeWidget extends Widget<number>{
    element: HTMLElement;
    constructor(anchor:HTMLElement){
        super(anchor)

        var template = `
            <input type="range" />
        `

        this.element = createAndAppend(this.anchor,template)
    }
}