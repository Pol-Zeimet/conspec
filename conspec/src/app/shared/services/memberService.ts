import { Injectable } from '@angular/core';
import { Member } from '../models';
import { ElectronService } from 'ngx-electron';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/src/dom/events/hammer_gestures';

@Injectable()
export class MemberService {

    private membersDb: any;

    constructor(private electronService: ElectronService) {
        const Datastore = require('nedb');
        const membersPath = this.electronService.remote.app.getPath('userData') + '\members.members.db';
        this.membersDb = new Datastore({ filename: membersPath, autoload: true });

    }



    persistMember(member: Member): Promise<Member> {
        const promise = new Promise<Member>((resolve, reject) => {
            this.membersDb.insert(member, function(err, newDoc){
                if (newDoc) {
                    member._id = newDoc._id;
                    console.log('assigned _id ' + member._id + ' to ' + member.name);
                    resolve(member);
                } else {
                    console.log(err);
                    member = undefined;
                    reject(member);
                }
            });
        });
        return promise;
    }

    updateMember(member: Member): Boolean {
        let succ: boolean;
        this.membersDb.update({_id: member._id}, member, {}, function(err, newDoc){
            if (newDoc) {
                succ = true;
            } else {
                succ = false;
                console.log(err);
            }
        });
        return succ;
    }

    getAllMembers(): Member[] {
        const members = new Array<Member>();
        this.membersDb.find({}, function(err, newDoc){
            if (newDoc) {
                console.log('loaded Members');
                console.log(newDoc);
                newDoc.forEach(element => {
                    console.log(element);
                    try {
                        members.push(element as Member);
                    } catch (error) {
                        console.log(error);
                    }
                });
            } else {
                console.log(err);
            }
        });
        return members;
    }

}
