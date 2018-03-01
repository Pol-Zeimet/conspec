import { Injectable } from '@angular/core';
import { Class, Member } from '../models';
import {ElectronService} from 'ngx-electron';
import { LoggerService } from './loggerService';

@Injectable()
export class ClassesService {

    private classesDb: any;

    constructor(private electronService: ElectronService,
                private loggerService: LoggerService) {
        if (this.electronService.isElectronApp) {
            const Datastore = require('nedb');
            const path = this.electronService.remote.app.getPath('userData') + '\classes.classes.db';
            this.classesDb = new Datastore({ filename: path, autoload: true });
        }
    }

    getAllClasses(): Promise<Class[]> {
        const logger = this.loggerService;
        let succ = true;
        let parseError: string;
        const promise = new Promise<Class[]>((resolve, reject) => {
            let classes = new Array<Class>();
            classes = [];
            this.classesDb.find({}, function(err, newDoc){
                if (newDoc) {
                    newDoc.forEach(element => {
                        try {
                            classes.push(element as Class);
                        } catch (error) {
                            parseError = error;
                            succ = false;
                        }
                    });
                    if (!succ) {
                        logger.displayError('Internal data error',
                                            'Could not parse content of Database to class while reading', err);
                        reject(parseError);
                    }
                } else {
                    logger.displayError('Internal data error', 'Could not read classes of database', err);
                    reject(err);
                }
                resolve(classes);
            });
        });
        return promise;
    }

    persistClass(classToPersist: Class): Class {
        const logger = this.loggerService;
        this.classesDb.insert(classToPersist, function(err, newDoc){
            if (newDoc) {
                classToPersist._id =  newDoc._id;
            } else {
                logger.displayError('Internal data error', 'Could not persist class data in database', err);
            }
        });
        return classToPersist;
    }

    updateClass(updatedClass: Class): Boolean {
        const logger = this.loggerService;
        let succ: boolean;
        this.classesDb.update({_id: updatedClass._id}, updatedClass, {}, function(err, newDoc){
            if (newDoc) {
                succ =  true;
            } else {
                succ = false;
                logger.displayError('Internal data error', 'Could not update class data in database', err);
            }
        });
        return succ;
    }

    deleteClass(removedClass: Class): Promise<boolean> {
        const logger = this.loggerService;
        const promise = new Promise<boolean>((resolve) => {
            this.classesDb.remove({ _id: removedClass._id }, function (err, numRemoved) {
                if (numRemoved) {
                    resolve(true);
                } else {
                    logger.displayError('Internal data error', 'Could not delete class data from database', err);
                    resolve(false);
                }
            });
        });
        return promise;
    }
}
