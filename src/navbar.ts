class Navbar{

    element: HTMLElement;

    constructor(){
        this.element = string2html(`
        <div class="ui secondary pointing menu">
            <a class="item" href="/">Home</a>
        </div>`)
    }

    addAppDef(appdef:AppDef){
        for(var obj of appdef.objdefinitions){
            this.addItem(obj.name,`/${obj.name}`)
        }
    }

    addItem(text:string, url:string){
        createAndAppend(this.element,`<a class="item" href=${url}>${text}</a>`)
    }
}
