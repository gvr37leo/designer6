

class FromToWidget extends Widget<{$gte:number, $lt:number}>{
    fromcontainer: HTMLElement;
    tocontainer: HTMLElement;

    constructor(widgetConstructor:new () => Widget<number>){
        super()

        var from = new widgetConstructor()
        var to = new widgetConstructor()
        // display:flex; flex-wrap:nowrap;
        this.element = string2html(`
            <div style="">
                <div id="fromcontainer"></div>
                <div id="tocontainer"></div>
            </div>`)
        this.fromcontainer = this.element.querySelector('#fromcontainer')
        this.tocontainer = this.element.querySelector('#tocontainer')
        this.fromcontainer.appendChild(from.element)
        this.tocontainer.appendChild(to.element)

        var usertriggeredEvent = true
        this.value.onClear.listen(val => {
            usertriggeredEvent = false
            from.value.set(undefined)
            to.value.set(undefined)
            usertriggeredEvent = true
            this.value.set({
                $gte:undefined,
                $lt:undefined
            })
        })

        from.value.onchange.listen(val => {
            if(usertriggeredEvent){
                this.value.set({
                    $gte:val,
                    $lt:to.value.get()
                })
            }
        })

        to.value.onchange.listen(val => {
            if(usertriggeredEvent){
                this.value.set({
                    $gte:from.value.get(),
                    $lt:val
                })
            }
        })
    }
}