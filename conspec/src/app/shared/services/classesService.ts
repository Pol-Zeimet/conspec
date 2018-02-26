import { Injectable } from '@angular/core';
import { Class, Member } from '../models';
import {ElectronService} from 'ngx-electron';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

@Injectable()
export class ClassesService {

    private classesDb: any;

    constructor(private electronService: ElectronService) {
        if (this.electronService.isElectronApp) {
            const Datastore = require('nedb');
            const path = this.electronService.remote.app.getPath('userData') + '\classes.classes.db';
            this.classesDb = new Datastore({ filename: path, autoload: true });
        }
    }

    getAllClasses(): Promise<Class[]> {
        const promise = new Promise<Class[]>((resolve, reject) => {
            let classes = new Array<Class>();
            classes = [];
            this.classesDb.find({}, function(err, newDoc){
                if (newDoc) {
                    newDoc.forEach(element => {
                        try {
                            classes.push(element as Class);
                        } catch (error) {
                            reject(error);
                        }
                    });
                } else {
                    reject(err);
                }
                resolve(classes);
            });
        });
        return promise;
    }

    persistClass(classToPersist: Class): Class {
        this.classesDb.insert(classToPersist, function(err, newDoc){
            if (newDoc) {
                classToPersist._id =  newDoc._id;
                console.log('assigned _id ' + classToPersist._id + ' to ' + classToPersist.name);
            } else {
                console.log(err);
            }
        });
        return classToPersist;
    }

    updateClass(updatedClass: Class): Boolean {
        let succ: boolean;
        this.classesDb.update({_id: updatedClass._id}, updatedClass, {}, function(err, newDoc){
            if (newDoc) {
                succ =  true;
                console.log('class with id' + updatedClass._id + ' has been updated ');
            } else {
                succ = false;
                console.log('error updating class with id' + updatedClass._id );
                console.log(err);
            }
        });
        return succ;
    }
}
