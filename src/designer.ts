/// <reference path="router.ts" />
/// <reference path="definition.ts" />
/// <reference path="navbar.ts" />
/// <reference path="views/detailView.ts" />
/// <reference path="localUtils.ts" />
/// <reference path="ajax.ts" />
/// <reference path="views/gridView.ts" />


interface Window{
    objidmap:Map<string,ObjDef>
    attributeidmap:Map<string,Attribute>
}


class Designer{

    router:Router
    navbar: Navbar;
    appDef: AppDef;
    template:string = `
        <div>
            <div id='navbar'></div>
            <div id='viewcontainer'></div>
            <div id='globalmodal'></div>
        </div>
    `
    htmlElement: HTMLElement;
    navbarElement: HTMLElement;
    viewcontainer: HTMLElement;
    globalmodal: HTMLElement;


    constructor(anchor:HTMLElement,appDef:AppDef){
        this.appDef = addImplicitRefs(appDef)
        var objnamemap = array2map(this.appDef.objdefinitions, obj => obj.name)
        window.objidmap = array2map(this.appDef.objdefinitions, obj => obj._id)
        window.attributeidmap = array2map(this.appDef.attributes, obj => obj._id)


        this.htmlElement = createAndAppend(anchor,this.template)
        this.navbarElement = this.htmlElement.querySelector('#navbar')
        this.viewcontainer = this.htmlElement.querySelector('#viewcontainer')
        this.globalmodal = this.htmlElement.querySelector('#globalmodal')

        this.navbar = new Navbar()
        this.navbarElement.appendChild(this.navbar.element)
        this.navbar.addAppDef(appDef)
        
        this.router = new Router()
        this.router.listen(new RegExp('^/$'), res => {
            var obj = this.appDef.objdefinitions[0]
            var gridview = new GridView(obj)
            this.viewcontainer.appendChild(gridview.element)
        })
        this.router.listen(new RegExp('^/([a-zA-Z0-9]+)$'), res => {
            var obj = objnamemap.get(res[1])
            var gridview = new GridView(obj)
            this.viewcontainer.appendChild(gridview.element)
        })
        this.router.listen(new RegExp('^/([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$'), res => {
            var obj = objnamemap.get(res[1])
            var id = res[2]
            get(obj.name,id).then(val => {
                new DetailView(this.viewcontainer, obj).renderDetailView(id).load(val)
            })
            
        })

        this.router.trigger(window.location.pathname)
        // new DetailView(this.viewcontainer, appdef.objdefinitions[0]).renderCreateView()

        // window.addEventListener('', e => {
        //     this.router.trigger('')
        // })
    }
}