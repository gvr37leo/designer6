class Button{
    element: HTMLButtonElement;

    constructor(text:string,classes:string, callback:() => void){
        var template:string = `
            <button class="ui button ${classes}" type="button">${text}</button>
        `
        this.element = string2html(template) as HTMLButtonElement
        this.element.addEventListener('click', callback)
    }
}

class DisableableButton extends Button{
    constructor(html: string, classes: string,dirtiedEvent:EventSystem<any>, callback: () => void) {
        super(html,classes,() => {
            this.element.disabled = true;//onclick
            callback()
        })

        this.element.disabled = true;//initial
        dirtiedEvent.listen((val) => {
            this.element.disabled = false;
        })
    }
}