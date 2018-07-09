class Button{
    element: HTMLElement;
    


    constructor(text:string,classes:string, callback:() => void){
        var template:string = `
            <button class="${classes}" type="button">${text}</button>
        `
        this.element = string2html(template)
        this.element.addEventListener('click', callback)
    }

}