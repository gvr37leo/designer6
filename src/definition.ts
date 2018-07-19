
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

    static makeAttributeFromObject
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