/// <reference path="router.ts" />
/// <reference path="definition.ts" />
/// <reference path="navbar.ts" />
/// <reference path="views/detailView.ts" />
/// <reference path="localUtils.ts" />
/// <reference path="ajax.ts" />
/// <reference path="views/gridView.ts" />
/// <reference path="modal.ts" />

// filter op gridview
// filter voor widgets
// dirtiedevent op table save knop
// titels
// pointerfilters
// caching of andere manier om ajax overhead te weren
// gridview limit/skipss

interface Window{
    objidmap:Map<string,ObjDef>
    attributeidmap:Map<string,Attribute>
    globalModal:Modal
}


class Designer{

    router:Router
    navbar: Navbar;
    appDef: AppDef;
    template:string = `
        <div>
            <div id='navbar'></div>
            <div id='viewcontainer' style="padding:10px;"></div>
        </div>
    `
    htmlElement: HTMLElement;
    navbarElement: HTMLElement;
    viewcontainer: HTMLElement;


    constructor(anchor:HTMLElement,appDef:AppDef){
        this.appDef = addImplicitRefs(appDef)
        var objnamemap = array2map(this.appDef.objdefinitions, obj => obj.name)
        window.objidmap = array2map(this.appDef.objdefinitions, obj => obj._id)
        window.attributeidmap = array2map(this.appDef.attributes, obj => obj._id)
        window.globalModal = new Modal()

        this.htmlElement = createAndAppend(anchor,this.template)
        this.navbarElement = this.htmlElement.querySelector('#navbar')
        this.viewcontainer = this.htmlElement.querySelector('#viewcontainer')

        this.navbar = new Navbar()
        this.navbarElement.appendChild(this.navbar.element)
        this.navbar.addAppDef(appDef)
        
        this.router = new Router()
        this.router.listen(new RegExp('^/$'), res => {
            var obj = this.appDef.objdefinitions[0]
            var gridview = new GridView(obj)
            this.viewcontainer.innerHTML = ''
            this.viewcontainer.appendChild(gridview.element)
        })
        this.router.listen(new RegExp('^/([a-zA-Z0-9]+)$'), res => {
            var obj = objnamemap.get(res[1])
            var gridview = new GridView(obj)
            this.viewcontainer.innerHTML = ''
            this.viewcontainer.appendChild(gridview.element)
        })
        this.router.listen(new RegExp('^/([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$'), res => {
            var obj = objnamemap.get(res[1])
            var id = res[2]
            var detailview = new DetailView(obj);
            detailview.renderDetailView(id)
            this.viewcontainer.innerHTML = ''
            this.viewcontainer.appendChild(detailview.element)
        })

        this.router.trigger(window.location.pathname)

        window.addEventListener('popstate',(event) => {
            this.router.trigger(window.location.pathname)
        })
    }
}