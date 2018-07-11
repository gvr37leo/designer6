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

    addTab(text:string, onselect:() => HTMLElement){
        var button = new Button(text,'default', () => {
            this.viewcontainer.replaceChild(onselect(),this.viewcontainer.children[0])
        })
        this.tabcontainer.appendChild(button.element)
    }
}