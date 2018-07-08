class Widget<T>{

    value:Box<T>
    anchor:HTMLElement

    constructor(anchor:HTMLElement){
        this.anchor = anchor
        this.value = new Box();
    }
}
