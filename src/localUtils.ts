/// <reference path="widgets/booleanWidget.ts" />
/// <reference path="widgets/dateWidget.ts" />
/// <reference path="widgets/dropdownWidget.ts" />
/// <reference path="widgets/idWidget.ts" />
/// <reference path="widgets/numberWidget.ts" />
/// <reference path="widgets/pointerWidget.ts" />
/// <reference path="widgets/rangeWidget.ts" />
/// <reference path="widgets/textWidget.ts" />
/// <reference path="widgets/enumWidget.ts" />
/// <reference path="widgets/fromtoWidget.ts" />
/// <reference path="widgets/textFilterWidget.ts" />


/// <reference path="widgets/widget.ts" />


function addImplicitRefs(appdef: AppDef): AppDef{
    var objmap = array2map(appdef.objdefinitions, atr => atr._id)

    for(var obj of appdef.objdefinitions){
        obj.passiveAttributes.push(new IdentityAttribute('1000',obj.name,obj._id))
        obj.passiveAttributes.push(new DateAttribute('1001','lastupdate',obj._id))
    }

    for(var attribute of appdef.attributes){
        objmap.get(attribute.belongsToObject).attributes.push(attribute)

        if(attribute.dataType == DataType.pointer){
            var referencedObject = objmap.get((attribute as PointerAttribute).pointsToObject)
            referencedObject.referencedAttributes.push(attribute as PointerAttribute)
        }
    }

    return appdef
}

function createWidget(attribute:Attribute,selfid:string):Widget<any>{
    var widget:Widget<any>
    switch (attribute.dataType) {
        case DataType.boolean:
            widget = new BooleanWidget()
            break;
        case DataType.number:
            widget = new NumberWidget()
            break;
        case DataType.range:
            widget = new RangeWidget()
            break;
        case DataType.date:
            widget = new DateWidget()
            break;
        case DataType.id:
            widget = new IDWidget(attribute as IdentityAttribute)
            break;
        case DataType.enum:
            widget = new EnumWidget(attribute as EnumAttribute)
            break;
        case DataType.pointer:
            widget = new PointerWidget(attribute as PointerAttribute,selfid)
            break;
        default://text
            widget = new TextWidget()
            break;
    }
    return widget
}

function createFilterWidget(attribute:Attribute):Widget<any>{
    var widget:Widget<any>
    switch (attribute.dataType) {
        case DataType.boolean:
            widget = new BooleanWidget()
            break;
        case DataType.number:
            widget = new FromToWidget(NumberWidget)
            break;
        case DataType.range:
            widget = new FromToWidget(RangeWidget)
            break;
        case DataType.date:
            widget = new FromToWidget(DateWidget)
            break;
        case DataType.id:
            widget = new IDWidget(attribute as IdentityAttribute)
            break;
        case DataType.enum:
            widget = new EnumWidget(attribute as EnumAttribute)
            break;
        case DataType.pointer:
            widget = new PointerWidget(attribute as PointerAttribute, undefined)
            break;
        default://text
            //regex
            widget = new TextFilterWidget()
            break;
    }
    return widget
}

function createAndAppend(element:HTMLElement, html:string):HTMLElement{ 
    var result = string2html(html); 
    element.appendChild(result) 
    return result; 
} 

function string2html(string):HTMLElement{
    var div = document.createElement('div')
    div.innerHTML = string;
    return div.children[0] as HTMLElement;
}

function array2map<T,F>(array:T[], fieldSelector:(obj:T) => F):Map<F,T>{
    var map:Map<F,T> = new Map()
    for(var obj of array){
        map.set(fieldSelector(obj),obj)
    }
    return map;
}

function getAllAttributes(obj:ObjDef):Attribute[]{
    return obj.passiveAttributes.concat(obj.attributes)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function indexReffedObjectFromPointerInObject(obj:any,attribute:Attribute,reffedObjects,objdef:ObjDef){
    var objpointer = obj[attribute.name];
    return reffedObjects[objdef.name][objpointer];
}

function getPrefetchedCollection(attribute:PointerAttribute):any[]{
    var collection = objidmap.get(attribute.pointsToObject);
    return prefetchedCollections.get(collection.name)
}

function getreffedCachedObject(obj:any,attribute:PointerAttribute,reffedObjects){
    var objdef = objidmap.get(attribute.pointsToObject);
    var object = indexReffedObjectFromPointerInObject(obj,attribute,reffedObjects,objdef)
    var list = prefetchedCollections.get(objdef.name)
    return {
        object,
        list
    }
}
