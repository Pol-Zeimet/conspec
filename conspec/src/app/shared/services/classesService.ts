import { Injectable } from "@angular/core";
import { Class, Member } from "../models";
import {ElectronService} from 'ngx-electron';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from "@angular/platform-browser-dynamic/src/platform_providers";

@Injectable()
export class ClassesService {
    
    private classesDb: any;

    constructor(private electronService: ElectronService){
        if(this.electronService.isElectronApp){
            var Datastore = require('nedb');
            var path = this.electronService.remote.app.getPath('userData') + '\classes.classes.db';
            this.classesDb = new Datastore({ filename: path, autoload: true }); 
        }
    }

    getAllClasses(): Class[]{
        var classes = new Array<Class>()
        this.classesDb.find({}, function(err, newDoc){
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
        this.classesDb.insert(classToPersist, function(err, newDoc){
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

    //change retunr type to response? sounds like a neat idea
    updateClass(updatedClass: Class): Boolean{
        var succ: boolean
        this.classesDb.update({_id: updatedClass._id}, updatedClass, {}, function(err, newDoc){
            if(newDoc){
                succ =  true
                console.log('class with id' + updatedClass._id + ' has been updated ')
            } else{
                succ = false
                console.log('error updating class with id' + updatedClass._id )
                console.log(err)
            }
        })
        return succ
    }
}
