/// <reference path="../localUtils.ts" />
/// <reference path="../button.ts" />


class Tabs{
    anchor: HTMLElement;
    element: HTMLElement;
    tabcontainer: HTMLElement;
    viewcontainer: HTMLElement;
    tabmap: Map<string, () => HTMLElement>;


    constructor(anchor:HTMLElement){
        this.anchor = anchor
        this.element = createAndAppend(anchor,`
            <div>
                <div id="tabcontainer"></div>
                <div id="viewcontainer"></div>
            </div>
        `)

        this.tabcontainer = this.element.querySelector('#tabcontainer')
        this.viewcontainer = this.element.querySelector('#viewcontainer')
        this.tabmap = new Map<string, () => HTMLElement>()
    }

    addTab(text:string, renderer:() => HTMLElement){
        this.tabmap.set(text,renderer)
        var button = new Button(text,'default', () => {
            this.render(renderer())
        })
        this.tabcontainer.appendChild(button.element)
    }

    selectTab(text:string){
        if(this.tabmap.has(text)){
            this.render(this.tabmap.get(text)())
        }
    }

    render(element:HTMLElement){
        this.viewcontainer.innerHTML = ''
        this.viewcontainer.appendChild(element)
    }
}