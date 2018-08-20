/// <reference path="src/ajaxDefinitionClasses.ts" />


import * as express from "express";
import * as bodyParser from "body-parser"
import * as mongodb from "mongodb"
// import * as fs from "fs"
import * as path from "path"
// import * as escapeRegexp from "escape-regexp"

var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';
var databasename = 'company'
var app = express();
app.use(bodyParser.json());//for json encoded http body's
app.use(bodyParser.urlencoded({ extended: false }));//for route parameters
app.use(express.static('./'));

var port = 8000;
// var exampledefinition = JSON.parse(fs.readFileSync('./public/definition.json','utf8'));
start()

function start(){
    mongoClient.connect(url, {useNewUrlParser:true}, function(err,client){
        var db = client.db(databasename)
        if(err){
            console.log('error connecting to mongodb retrying in 5 seconds')
            setTimeout(start,5000)
        }
        else {
            console.log('connected to mongo');
        }
    
        app.get('/api/:object', function(req, res){
            var collection = db.collection(req.params.object)
            collection.find({}).toArray(function(err, result){
                collection.countDocuments({}).then((count) => {
                    res.send({
                        data:result,
                        collectionSize:count
                    });
                })
                
            })
        })
    
        app.post('/api/search/:object', function(req, res){
            var collection = db.collection(req.params.object)
            var query:Query = req.body;
            if(query.filter._id){
                query.filter._id = new mongodb.ObjectID(query.filter._id)
            }
            collection.find(query.filter).sort(query.sort).skip(query.paging.skip).limit(query.paging.limit).toArray(function(err, result){
                collection.countDocuments({}).then((count) => {
                    res.send({
                        data:result,
                        collectionSize:count
                    });
                })
            })
        })
    
        app.get('/api/:object/:id', function(req, res){
            var collection = db.collection(req.params.object)
            collection.findOne({_id:new mongodb.ObjectID(req.params.id)}).then(function(doc){
                res.send(doc);
            })
        })
    
        app.post('/api/:object', function(req, res){
            var collection = db.collection(req.params.object)
    
            delete req.body._id
            req.body.lastupdate = new Date().getTime()
            collection.insertOne(req.body, function(err, result){
                if(err)res.send(err)
                else res.send({
                    status:'success',
                    insertedId:result.insertedId,
                });
            });
        })
    
        app.put('/api/:object/:id', function(req, res){
            var collection = db.collection(req.params.object)
    
            delete req.body._id
            req.body.lastupdate = new Date().getTime()
            collection.updateOne({_id:new mongodb.ObjectID(req.params.id)}, {$set:req.body}, function(err, result){
                if(err)res.send(err);
                else res.send({status:'success'});
            })
        })
    
        app.delete('/api/:object/:id', function(req, res){
            var collection = db.collection(req.params.object)
    
            collection.deleteOne({_id:new mongodb.ObjectID(req.params.id)}, function(err, result){
                if(err)res.send(err)
                else res.send({status:'success'});
            })
        })
    

        app.post('/api/refsearch/:object', function(req, res){
            var maincollection = db.collection(req.params.object)
            var query:Query = req.body;
            if(query.filter._id){
                query.filter._id = new mongodb.ObjectID(query.filter._id)
            }
            var cursor = maincollection.find(query.filter).sort(query.sort).skip(query.paging.skip).limit(query.paging.limit)
            
            cursor.toArray(function(err, result){
                var reffefObjects:{[k:string]:{[s:string]:any}} = {}
                var reffedObjectsIdHolder:Map<string,Set<string>> = new Map()

                //unieke sets
                var uniqueCollections = new Set(query.reffedAttributes.map(ref => ref.collection))

                //initialiseer collections
                for(let collection of Array.from(uniqueCollections)){// only for unique collections
                    reffefObjects[collection] = {}
                    reffedObjectsIdHolder.set(collection,new Set())
                }

                //ga attributen van objecten langs en voeg de ids toe aan de bijbehorende sets
                //deze loop kan erg lang zijn als er veel objecten zijn gevonden in de query
                for(var obj of result){
                    for(var attribute of query.reffedAttributes){
                        var id = obj[attribute.attribute]
                        if(id == null){
                            continue;
                        }
                        reffedObjectsIdHolder.get(attribute.collection).add(id)
                    }
                }
                
                //haal de objecten op van de gevraagde ids
                var promises:Promise<any>[] = []
                var collectionSets = Array.from(reffedObjectsIdHolder)
                for(let collectionSet of collectionSets){
                    let collection = collectionSet[0]
                    let ids = Array.from(collectionSet[1].values()).map(id => new mongodb.ObjectID(id))
                    promises.push(db.collection(collection).find({_id:{$in:ids}}).toArray())
                }

                //zet de objecten op het return object
                Promise.all(promises).then(foundObjectsFromCollection => {
                    for(var i = 0; i < foundObjectsFromCollection.length; i++){
                        var collectionResult = foundObjectsFromCollection[i]
                        var collectionname = collectionSets[i][0]
                        for(var obj of collectionResult){
                            reffefObjects[collectionname][obj._id] = obj
                        }
                    }

                    cursor.count().then(resultSize => {
                        maincollection.countDocuments({}).then((count) => {
                            res.send({
                                data:result,
                                dataSize:resultSize,
                                collectionSize:count,
                                reffedObjects:reffefObjects
                            });
                        })
                    })
                })
            })
        })

        
        app.all('/*', function(req, res, next) {
            res.sendFile(path.resolve('index.html'));
        });
    });
}

app.listen(port, function(){
    console.log('listening on ' + port)
})
