
class AppDef{

    databaseName: string
    objdefinitions:ObjDef[]
    attributes:Attribute[]

    constructor(objdefinitions:ObjDef[],attributes:Attribute[]){
        this.objdefinitions = objdefinitions
        this.attributes = attributes
    }
}

class ObjDef{

    _id:string
    name:string
    dropdownAttributePointer:string

    attributes:Attribute[] = []
    passiveAttributes:Attribute[] = []
    referencedAttributes:PointerAttribute[] = []

    constructor(_id: string, name: string, dropdownAttributePointer: string){
        this._id = _id
        this.name = name
        this.dropdownAttributePointer = dropdownAttributePointer
    }
}

class Attribute{

    _id:string
    name: string
    belongsToObject:string
    dataType:string

    constructor(_id:string, name: string,belongsToObject:string,dataType:string){
        this._id = _id
        this.name = name
        this.belongsToObject = belongsToObject
        this.dataType = dataType
    }

    static makeAttributeFromObject(attribute:Attribute):Attribute{
        var newAttribute:Attribute = null;
        switch(attribute.dataType){
            case 'text':
                newAttribute = new TextAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case 'boolean':
                newAttribute = new BooleanAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case 'pointer':
                newAttribute = new PointerAttribute(attribute._id,attribute.name,attribute.belongsToObject,(attribute as PointerAttribute).pointsToObject)
                break;
            case 'date':
                newAttribute = new DateAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case 'number':
                newAttribute = new NumberAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;

// these should never be hit because they shouldnt have to be made in the editor and are added automatically in the addimplicitrefs function
            case 'id':
                newAttribute = new IdentityAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
        }
        newAttribute.belongsToObject = attribute.belongsToObject

        return newAttribute
    }
}

class BooleanAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id,name,belongsToObject, 'boolean')
    }
}

class DateAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, 'date')
    }
}

class NumberAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, 'number')
    }
}

class TextAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, 'text')
    }
}

class IdentityAttribute extends Attribute{
    pointerType:string
    
    constructor(_id: string, pointerType: string, belongsToObject: string){
        super(_id, '_id', belongsToObject, 'id')
        this.pointerType = pointerType
        // this.readonly = true
    }
}

class PointerAttribute extends Attribute{
    pointsToObject:string
    filterOnColumn:string
    usingOwnColumn:string

    constructor(_id: string, name: string, belongsToObject: string, pointsToObject: string,filterOnColumn:string = null,usingOwnColumn:string = null){
        super(_id, name, belongsToObject, 'pointer')
        this.pointsToObject = pointsToObject
        this.filterOnColumn = filterOnColumn
        this.usingOwnColumn = usingOwnColumn
    }
}

class EnumAttribute extends Attribute{
    options:string[]
    constructor(_id: string, name: string, belongsToObject: string,options:string[]){
        super(_id, name, belongsToObject, 'enum')
        this.options = options
    }
}