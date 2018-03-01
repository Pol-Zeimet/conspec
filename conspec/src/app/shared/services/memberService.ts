import { Injectable } from '@angular/core';
import { Member } from '../models';
import { ElectronService } from 'ngx-electron';
import { LoggerService } from './loggerService';
import { error } from 'util';

@Injectable()
export class MemberService {

    private membersDb: any;

    constructor(private electronService: ElectronService, private loggerService: LoggerService) {
        const Datastore = require('nedb');
        const membersPath = this.electronService.remote.app.getPath('userData') + '\members.members.db';
        this.membersDb = new Datastore({ filename: membersPath, autoload: true });

    }



    persistMember(member: Member): Promise<Member> {
        const logger = this.loggerService;
        const promise = new Promise<Member>((resolve, reject) => {
            this.membersDb.insert(member, function (err, newDoc) {
                if (newDoc) {
                    member._id = newDoc._id;
                    resolve(member);
                } else {
                    logger.displayError('Internal data error', 'Could not persist member data in database', err);
                    reject(member);
                }
            });
        });
        return promise;
    }

    updateMember(member: Member): Boolean {
        let succ: boolean;
        const logger = this.loggerService;
        this.membersDb.update({ _id: member._id }, member, {}, function (err, newDoc) {
            if (newDoc) {
                succ = true;
            } else {
                succ = false;
                this.logger.displayError('Internal data error', 'Could not update member data in database', err);
                this.logger.logError(err);
            }
        });
        return succ;
    }

    getAllMembers(): Promise<Member[]> {
        const logger = this.loggerService;
        let succ = true;
        let parseError: string;
        const promise = new Promise<Member[]>((resolve, reject) => {
            const members = new Array<Member>();
            this.membersDb.find({}, function (err, newDoc) {
                if (newDoc) {
                    newDoc.forEach(element => {
                        try {
                            members.push(element as Member);
                        } catch (error) {
                            succ = false;
                            parseError = error;
                        }
                    });
                    if (!succ) {
                        logger.displayError('Internal data error',
                                                        'Could not parse member data while reading from database', err);
                        reject(parseError);
                    }
                    resolve(members);
                } else {
                    logger.displayError('Internal data error', 'Could not read member data from database', err);
                    reject(err);
                }
            });
        });
        return promise;
    }

    deleteMember(member: Member): Promise<boolean> {
        const logger = this.loggerService;
        const promise = new Promise<boolean>((resolve) => {
            this.membersDb.remove({ _id: member._id }, function (err, numRemoved) {
                if (numRemoved) {
                    resolve(true);
                } else {
                    logger.displayError('Internal data error', 'Could not delete member data from database', err);
                    resolve(false);
                }
            });
        });
        return promise;
    }

}
