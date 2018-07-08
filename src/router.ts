class Router{

    listeners:RouteRegistration[] = []

    constructor(){
        
    }

    listen(regex:RegExp, listener:(string:RegExpExecArray) => void){
        this.listeners.push(new RouteRegistration(regex,listener))
    }

    trigger(string:string){
        for (var routeRegistration of this.listeners) {
            var result = routeRegistration.regex.exec(string)
            if(result != null){
                routeRegistration.listener(result)
            }
        }
    }
}

class RouteRegistration{
    
    regex:RegExp
    listener:(string:RegExpExecArray) => void

    constructor(regex:RegExp, listener:(string:RegExpExecArray) => void){
        this.regex = regex
        this.listener = listener
    }
}