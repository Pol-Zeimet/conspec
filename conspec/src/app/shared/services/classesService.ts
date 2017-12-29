import { Injectable } from "@angular/core";
import { Class } from "../models";
import {ElectronService} from 'ngx-electron';

@Injectable()
export class ClassesService {
    
    private db: any;

    constructor(private electronService: ElectronService){
        if(this.electronService.isElectronApp){
            var Datastore = require('nedb');
            var path = this.electronService.remote.app.getPath('userData') + '\classes.db';
            this.db = new Datastore({ filename: path, autoload: true }); 
        }
    }

    getAllClasses(): Class[]{
        var classes = new Array<Class>()
        this.db.find({}, function(err, newDoc){
            if(newDoc){
                console.log(newDoc)
                newDoc.forEach(element => {
                    console.log(element)
                    try{
                        classes.push(element as Class)
                    } catch (error) {
                        console.log(error)
                    }
                }) 
            } else {
                console.log(err)
            }
        })
        return classes
    }

    persistClass(classToPersist: Class): Class{
        this.db.insert(classToPersist, function(err, newDoc){
            if (newDoc){
                classToPersist._id =  newDoc._id;
                console.log('assigned _id ' + classToPersist._id + ' to '+ classToPersist.name)
            }
            else{
                console.log(err)
            }
        });
        return classToPersist;
    }
}