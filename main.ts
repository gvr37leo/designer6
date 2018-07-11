/// <reference path="src/designer.ts" />
/// <reference path="src/views/table.ts" />


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

// var designer = new Designer(document.querySelector('#main'), appdef)

class Cat{
    name:string
    age:number

    constructor(name:string, age:number){
        this.name = name
        this.age = age
    }
}

var table = new Table<Cat>([
    new Column('name',cat => {
        var widget = new TextWidget()
        widget.value.set(cat.name)
        widget.value.onchange.listen(val => cat.name = val)
        return widget.element
    }, () => {
        var widget = new TextWidget()
        return widget.element
    }),
    new Column('age',cat => {
        var widget = new NumberWidget()
        widget.value.set(cat.age)
        widget.value.onchange.listen(val => cat.age = val)
        return widget.element
    }, () => {
        var widget = new NumberWidget()
        return widget.element
    })
])
document.querySelector('#main').appendChild(table.element)

var cats = [new Cat('piet',2), new Cat('snuffel',3)]
table.load(cats)


