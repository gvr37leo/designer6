/// <reference path="../localUtils.ts" />
/// <reference path="../button.ts" />


class Tabs{
    anchor: HTMLElement;
    element: HTMLElement;
    tabcontainer: HTMLElement;
    viewcontainer: HTMLElement;
    tabmap: Map<string, () => void>;
    private tabbuttonMap:Map<string,HTMLElement>
    private currentTabButton:HTMLElement


    constructor(anchor:HTMLElement){
        this.anchor = anchor
        this.element = createAndAppend(anchor,`
            <div>
                <div class="pb-1 d-flex buttongroup" id="tabcontainer"></div>
                <div class="p-3 greyborder" style="overflow:auto;" id="viewcontainer"></div>
            </div>
        `)

        this.tabcontainer = this.element.querySelector('#tabcontainer')
        this.viewcontainer = this.element.querySelector('#viewcontainer')
        this.tabmap = new Map()
        this.tabbuttonMap = new Map()
    }

    addTab(id:string,text:string, renderer:() => void){
        this.tabmap.set(id,renderer)
        var button = new Button(text,'btn-primary buttonchild', () => {
            this.selectTab(id)

        })
        this.tabbuttonMap.set(id,button.element)
        this.tabcontainer.appendChild(button.element)
    }

    selectTab(id:string){
        if(this.tabmap.has(id)){
            this.tabmap.get(id)()
            var button = this.tabbuttonMap.get(id)
            if(this.currentTabButton){
                this.currentTabButton.classList.remove('active')
            }
            this.currentTabButton = button
            button.classList.add('active')
        }
    }
}