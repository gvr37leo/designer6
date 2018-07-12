class Navbar{

    navbarElement: HTMLElement;
    element: HTMLElement;

    constructor(){
        this.element = string2html(`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Home</a>
            <ul id='navbar' class="navbar-nav"></ul>
        </nav>`)
        this.navbarElement = this.element.querySelector('#navbar')
    }

    addAppDef(appdef:AppDef){
        for(var obj of appdef.objdefinitions){
            this.addItem(obj.name,`/${obj.name}`)
        }
    }

    addItem(text:string, url:string){
        createAndAppend(this.navbarElement,`<li class="nav-item"><a class="nav-link" href=${url}>${text}</a></li>`)
    }
}
