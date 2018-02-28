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
            this.membersDb.insert(member, function (err, newDoc) {
                if (newDoc) {
                    member._id = newDoc._id;
                    console.log('assigned _id ' + member._id + ' to ' + member.name);
                    resolve(member);
                } else {
                    console.log(err);
                    reject(member);
                }
            });
        });
        return promise;
    }

    updateMember(member: Member): Boolean {
        let succ: boolean;
        this.membersDb.update({ _id: member._id }, member, {}, function (err, newDoc) {
            if (newDoc) {
                succ = true;
            } else {
                succ = false;
                console.log(err);
            }
        });
        return succ;
    }

    getAllMembers(): Promise<Member[]> {
        const promise = new Promise<Member[]>((resolve, reject) => {
            const members = new Array<Member>();
            this.membersDb.find({}, function (err, newDoc) {
                if (newDoc) {
                    newDoc.forEach(element => {
                        try {
                            members.push(element as Member);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    resolve(members);
                } else {
                    reject(err);
                }
            });
        });
        return promise;
    }

    deleteMember(member: Member): Promise<boolean> {
        const promise = new Promise<boolean>((resolve) => {
            this.membersDb.remove({ _id: member._id }, function (err, numRemoved) {
                if (numRemoved) {
                    console.log('member with member._id: ' + member._id + ' has been removed');
                    resolve(true);
                } else {
                    console.log(err);
                    resolve(false);
                }
            });
        });
        return promise;
    }

}
