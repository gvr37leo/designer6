/// <reference path="src/designer.ts" />
/// <reference path="src/views/table.ts" />

function generateAppdef(){
    var query = {
        filter:{},
        paging:{
            limit:0,
            skip:0
        },
        sort:{}
    }
    Promise.all([getList<any>('object',query),getList<any>('attribute',query)]).then(res => {
        var objects = res[0].data
        var attributes = res[1].data

        var appdef = new AppDef(
            objects.map(obj => new ObjDef(obj._id,obj.name,obj.dropdownAttributePointer)),
            attributes.map(attribute => Attribute.makeAttributeFromObject(attribute))
        )
        console.log(appdef)
        download('appdef',JSON.stringify(appdef, null, '\t'))
    })
    
}

var selfdef = new AppDef([
    new ObjDef('1','object','1'),
    new ObjDef('2','attribute','3'),
],[
    new TextAttribute('1','name','1'),
    new PointerAttribute('2','dropdownAttribute','1','2'),

    new TextAttribute('3','name','2'),
    new EnumAttribute('4','dataType','2',['text','number','boolean','date','pointer']),
    new PointerAttribute('5','belongsToObject','2','1'),
    new PointerAttribute('6','pointsToObject','2','1')
])

var appdef = new AppDef([
    new ObjDef('1','persoon','1'),
    new ObjDef('2','bedrijf','1'),
    new ObjDef('3','persoonWerktBijBedrijf',null),
],[
    new TextAttribute('1','name','1'),
    new BooleanAttribute('2','homeless','1'),
    new DateAttribute('3','birthday','1'),
    new NumberAttribute('4','lengte','1'),
    new PointerAttribute('5','vriend','1','1'),

    new TextAttribute('6','name','2'),
    new TextAttribute('7','branch','2'),
    new NumberAttribute('8','rating','2'),

    new PointerAttribute('9','werknemer','3','1'),
    new PointerAttribute('10','werkgever','3','2'),
    new NumberAttribute('11','salaris','3'),
])

var designer = new Designer(document.querySelector('#main'), appdef)
designer.navbar.element.appendChild(new Button('generate','btn-info',generateAppdef).element)


