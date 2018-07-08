/// <reference path="node_modules/vectorx/vector.ts" />
function pathfind(start:Knot, goal:Knot):Knot[]{
    var visited = new Map<Knot,boolean>()
    var frontier = [start]
    start.cost = 0

    while(frontier.length > 0){
        var currentP = findBest(frontier,(el) => -el.cost)
        var current = frontier.splice(currentP,1)[0]

        for(var edge of current.neighbours){//that hasnt been visited
            var neighbour = edge.destination
            if(visited.get(neighbour) == true){
                continue
            }
            frontier.push(neighbour)

            var costToNeighbour = current.cost + edge.weight
            if(costToNeighbour < neighbour.cost){
                neighbour.cost = costToNeighbour
                neighbour.crumb = current
                if(neighbour == goal){
                    return backtrack(goal)
                }
            }
        }

        visited.set(current,true)
    }
}

function backtrack(end:Knot):Knot[]{
    var path = []
    var current = end

    while(current != null){
        path.unshift(current)
        current = current.crumb
    }

    return path
}

function findBest<T>(list:T[],evaluator:(el:T) => number):number{
    if(list.length == 0){
        return -1
    }
    var best = evaluator(list[0])
    var bestIndex = 0

    for (var i = 1; i < list.length; i++) {
        var score = evaluator(list[i])
        if(score > best){
            best = score
            bestIndex = i
        }
    }
    return bestIndex
}

class Knot{
    neighbours:Edge[]
    cost:number
    crumb:Knot
    pos:Vector2

    constructor(cost:number, neighbours:Edge[],pos:Vector2){
        this.pos = pos
        this.cost = cost
        this.neighbours = neighbours
    }
}

class Edge{
    weight:number
    destination:Knot
    blocked:boolean

    constructor(weight:number, destination:Knot, blocked:boolean){
        this.weight = weight
        this.destination = destination
        this.blocked = blocked
    }
}
