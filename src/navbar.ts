class Navbar{

    element: HTMLElement;

    constructor(){
        this.element = string2html(`
        <div class="nav pt-1 pb-1" style="border-bottom: 3px solid black;">
        </div>`)
        this.addItem('Home','/')
    }

    addAppDef(appdef:AppDef){
        for(var obj of appdef.objdefinitions){
            this.addItem(obj.name,`/${obj.name}`)
        }
    }

    addItem(text:string, url:string){
        var anchortag = string2html(`<li class="nav-item"><a class="nav-link" href="${url}">${text}</a></li>`)
        anchortag.addEventListener('click', e => {
            e.preventDefault()
            designer.router.pushTrigger(url)
        })
        this.element.appendChild(anchortag)
    }
}
