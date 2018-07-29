
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

    genReffedAttributes():AttributeReference[]{
        var reffedAttributes:AttributeReference[] = []
        for(var attribute of this.attributes){
            if(attribute.dataType == DataType.pointer){
                reffedAttributes.push({
                    attribute:attribute.name,
                    collection:objidmap.get(attribute.belongsToObject).name
                })
            }
        }
        return reffedAttributes
    }
}

class Attribute{

    _id:string
    name: string
    belongsToObject:string
    dataType:DataType

    constructor(_id:string, name: string,belongsToObject:string,dataType:DataType){
        this._id = _id
        this.name = name
        this.belongsToObject = belongsToObject
        this.dataType = dataType
    }

    static makeAttributeFromObject(attribute:Attribute):Attribute{
        var newAttribute:Attribute = null;
        switch(attribute.dataType){
            case DataType.text:
                newAttribute = new TextAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case DataType.boolean:
                newAttribute = new BooleanAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case DataType.pointer:
                newAttribute = new PointerAttribute(attribute._id,attribute.name,attribute.belongsToObject,(attribute as PointerAttribute).pointsToObject)
                break;
            case DataType.date:
                newAttribute = new DateAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
            case DataType.number:
                newAttribute = new NumberAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;

// these should never be hit because they shouldnt have to be made in the editor and are added automatically in the addimplicitrefs function
            case DataType.id:
                newAttribute = new IdentityAttribute(attribute._id,attribute.name,attribute.belongsToObject)
                break;
        }
        newAttribute.belongsToObject = attribute.belongsToObject

        return newAttribute
    }
}

class BooleanAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id,name,belongsToObject, DataType.boolean)
    }
}

class DateAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, DataType.date)
    }
}

class NumberAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, DataType.number)
    }
}

class TextAttribute extends Attribute{
    constructor(_id: string, name: string, belongsToObject: string){
        super(_id, name, belongsToObject, DataType.text)
    }
}

class IdentityAttribute extends Attribute{
    pointerType:string
    
    constructor(_id: string, pointerType: string, belongsToObject: string){
        super(_id, '_id', belongsToObject, DataType.id)
        this.pointerType = pointerType
        // this.readonly = true
    }
}

class PointerAttribute extends Attribute{
    pointsToObject:string
    filterOnColumn:string
    usingOwnColumn:string

    constructor(_id: string, name: string, belongsToObject: string, pointsToObject: string,filterOnColumn:string = null,usingOwnColumn:string = null){
        super(_id, name, belongsToObject, DataType.pointer)
        this.pointsToObject = pointsToObject
        this.filterOnColumn = filterOnColumn
        this.usingOwnColumn = usingOwnColumn
    }
}

class EnumAttribute extends Attribute{
    options:string[]
    constructor(_id: string, name: string, belongsToObject: string,options:string[]){
        super(_id, name, belongsToObject, DataType.enum)
        this.options = options
    }
}

enum DataType{
    text = 'text',
    date = 'date',
    range = 'range',
    number = 'number',
    pointer = 'pointer',
    id = 'id',
    enum = 'enum',
    boolean = 'boolean'
}