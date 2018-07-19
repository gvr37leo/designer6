/// <reference path="widgets/booleanWidget.ts" />
/// <reference path="widgets/dateWidget.ts" />
/// <reference path="widgets/dropdownWidget.ts" />
/// <reference path="widgets/idWidget.ts" />
/// <reference path="widgets/numberWidget.ts" />
/// <reference path="widgets/pointerWidget.ts" />
/// <reference path="widgets/rangeWidget.ts" />
/// <reference path="widgets/textWidget.ts" />
/// <reference path="widgets/enumWidget.ts" />

/// <reference path="widgets/widget.ts" />


function addImplicitRefs(appdef: AppDef): AppDef{
    var objmap = array2map(appdef.objdefinitions, atr => atr._id)

    for(var obj of appdef.objdefinitions){
        obj.passiveAttributes.push(new IdentityAttribute('1000',obj.name,obj._id))
        obj.passiveAttributes.push(new DateAttribute('1001','lastupdate',obj._id))
    }

    for(var attribute of appdef.attributes){
        objmap.get(attribute.belongsToObject).attributes.push(attribute)

        if(attribute.dataType == 'pointer'){
            var referencedObject = objmap.get((attribute as PointerAttribute).pointsToObject)
            referencedObject.referencedAttributes.push(attribute as PointerAttribute)
        }
    }

    return appdef
}

function createWidget(attribute:Attribute):Widget<any>{
    var widget:Widget<any>
    switch (attribute.dataType) {
        case 'boolean':
            widget = new BooleanWidget()
            break;
        case 'number':
            widget = new NumberWidget()
            break;
        case 'date':
            widget = new DateWidget()
            break;
        case 'id':
            widget = new IDWidget(attribute as IdentityAttribute)
            break;
        case 'enum':
            widget = new EnumWidget(attribute as EnumAttribute)
            break;
        case 'pointer':
            widget = new PointerWidget(attribute as PointerAttribute)
            break;
        default://text
            widget = new TextWidget()
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
