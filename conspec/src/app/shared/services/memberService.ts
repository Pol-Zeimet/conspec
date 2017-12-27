import { Injectable } from "@angular/core";
import { Member, Class } from "../models";
import {ClassesService } from "./classesService";
import { ElectronService } from "ngx-electron";

@Injectable()
export class MemberService {

    private db: any;
    

    constructor(private classesService: ClassesService, private electronService: ElectronService){
        var Datastore = require('nedb');
        var path = this.electronService.remote.app.getPath('userData') + '/data/classes.db';
        this.db = new Datastore({ filename: path, autoload: true });  
    }



    persistMember( concernedClass: Class, member: Member){
        this.db.insert(member, function(err, newDoc){
            if (newDoc){
                concernedClass.members.push(newDoc);
                //classesService.updateClass(concernedClass, newMember);
            }
            else{
                console.log(err) //TODO need serious loggin here!!
            }
        });
    }



}