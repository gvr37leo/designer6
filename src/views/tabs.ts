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
                <div class="ui top attached tabular menu" id="tabcontainer"></div>
                <div class="ui bottom attached segment" id="viewcontainer"></div>
            </div>
        `)

        this.tabcontainer = this.element.querySelector('#tabcontainer')
        this.viewcontainer = this.element.querySelector('#viewcontainer')
        this.tabmap = new Map<string, () => HTMLElement>()
    }

    addTab(id:string,text:string, renderer:() => HTMLElement){
        this.tabmap.set(id,renderer)
        var button = new Button(text,'item active', () => {
            this.render(renderer())
        })
        this.tabcontainer.appendChild(button.element)
    }

    selectTab(id:string){
        if(this.tabmap.has(id)){
            this.render(this.tabmap.get(id)())
        }
    }

    render(element:HTMLElement){
        this.viewcontainer.innerHTML = ''
        this.viewcontainer.appendChild(element)
    }
}