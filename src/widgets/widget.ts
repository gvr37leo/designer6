class Widget<T>{
    element: HTMLElement;
    value:Box<T>

    constructor(){
        this.value = new Box();
    }
}
