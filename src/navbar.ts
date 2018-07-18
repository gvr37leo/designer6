class Navbar{

    element: HTMLElement;

    constructor(){
        this.element = string2html(`
        <div class="ui secondary pointing menu">
        </div>`)
        this.addItem('Home','/')
    }

    addAppDef(appdef:AppDef){
        for(var obj of appdef.objdefinitions){
            this.addItem(obj.name,`/${obj.name}`)
        }
    }

    addItem(text:string, url:string){
        var anchortag = string2html(`<a class="item" href="${url}">${text}</a>`)
        anchortag.addEventListener('click', e => {
            e.preventDefault()
            designer.router.pushTrigger(url)
        })
        this.element.appendChild(anchortag)
    }
}
