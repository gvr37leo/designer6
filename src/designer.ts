/// <reference path="router.ts" />
/// <reference path="definition.ts" />
/// <reference path="navbar.ts" />
/// <reference path="views/detailView.ts" />
/// <reference path="localUtils.ts" />
/// <reference path="ajax.ts" />
/// <reference path="views/gridView.ts" />
/// <reference path="modal.ts" />

// pointerfilters
// naam pointers vervangen met id pointers

var globalModal:Modal
var objidmap = new Map<string,ObjDef>()
var attributeidmap = new Map<string,Attribute>()
var prefetchedCollections = new Map<string,any[]>() 

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
        objidmap = array2map(this.appDef.objdefinitions, obj => obj._id)
        attributeidmap = array2map(this.appDef.attributes, obj => obj._id)
        globalModal = new Modal()

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
            gridview.sync()
            this.viewcontainer.innerHTML = ''
            this.viewcontainer.appendChild(gridview.element)
        })
        this.router.listen(new RegExp('^/([a-zA-Z0-9]+)$'), res => {
            var obj = objnamemap.get(res[1])
            var gridview = new GridView(obj)
            gridview.sync()
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

        this.preloadCollections(10).then(() => { 
            this.router.trigger(window.location.pathname) 
        }) 

        window.addEventListener('popstate',(event) => {
            this.router.trigger(window.location.pathname)
        })
    }

    preloadCollections(limit:number){ 
        var promises:Promise<void>[] = [] 
        for(let object of this.appDef.objdefinitions){ 
            promises.push(getList(object.name,{ 
                filter:{}, 
                paging:{ 
                    skip: 0, 
                    limit: limit 
                }, 
                sort:{},
                reffedAttributes:[]
            }).then(res => { 
                prefetchedCollections.set(object.name,res.data) 
            }))  
        } 
        return Promise.all(promises) 
    } 
}