/// <reference path="src/designer.ts" />
/// <reference path="src/views/table.ts" />
/// <reference path="src/generated.ts" />


var selfdef = new AppDef([
    new ObjDef('1','objdefinitions','1'),
    new ObjDef('2','attributes','3'),
],[
    new TextAttribute('1','name','1'),
    new PointerAttribute('2','dropdownAttributePointer','1','2','5'),

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

var designer = new Designer(document.querySelector('#main'), readAppdef(persoonbedrijfgenerated))


designer.navbar.element.appendChild(new Button('export','btn-info',() => {
    exportDb(selfdef).then(res => {
        download('appdef',JSON.stringify(res, null, '\t'))
    })
}).element)


