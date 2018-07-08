class Navbar{

    anchor: HTMLElement;
    template:string = `
        <div id='navbar'></div>
    `
    navbarElement: HTMLElement;

    constructor(anchor:HTMLElement){
        this.anchor = anchor
        this.navbarElement = createAndAppend(anchor,this.template)
    }

    addAppDef(appdef:AppDef){
        for(var obj of appdef.objdefinitions){
            this.addItem(obj.name,`/${obj.name}`)
        }
    }

    addItem(text:string, url:string){
        createAndAppend(this.navbarElement,`<a href=${url}>${text}</a>`)
    }
}