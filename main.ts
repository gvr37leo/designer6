/// <reference path="src/designer.ts" />


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