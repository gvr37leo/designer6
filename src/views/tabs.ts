/// <reference path="gridView.ts" />
/// <reference path="../localUtils.ts" />
/// <reference path="../button.ts" />


class Tabs{
    anchor: HTMLElement;
    element: HTMLElement;
    tabcontainer: HTMLElement;
    viewcontainer: HTMLElement;


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
    }

    addTab(text:string, onselect:() => void){
        var button = new Button(text,'default', () => {
            this.tabcontainer.innerHTML = ''
            this.tabcontainer.appendChild(gridview.element)
        })
        this.tabcontainer.appendChild(button.element)
    }

    selectTab(){
        
    }
}