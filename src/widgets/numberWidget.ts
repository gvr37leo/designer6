class NumberWidget extends Widget<number>{
    element: HTMLElement;
    constructor(anchor:HTMLElement){
        super(anchor)

        var template = `
            <input type="number" />
        `

        this.element = createAndAppend(this.anchor,template)
    }
}