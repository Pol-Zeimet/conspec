import { Injectable } from '@angular/core';
import { Session, Class } from '../models';
import { ClassesService } from './classesService';
import { ElectronService } from 'ngx-electron';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/src/dom/events/hammer_gestures';

@Injectable()
export class SessionService {

    private sessionsDb: any;

    constructor(private classesService: ClassesService, private electronService: ElectronService) {
        const Datastore = require('nedb');
        const sessionsPath = this.electronService.remote.app.getPath('userData') + '\sessions.sessions.db';
        this.sessionsDb = new Datastore({ filename: sessionsPath, autoload: true });

    }



    persistSession(session: Session): Session {
        this.sessionsDb.insert(session, function (err, newDoc) {
            if (newDoc) {
                session._id = newDoc._id;
            } else {
                console.log(err);
            }
        });
        return session;
    }
    updateSession(session: Session): Boolean {
        let succ: boolean;
        this.sessionsDb.update({ _id: session._id }, session, {}, function (err, newDoc) {
            if (newDoc) {
                succ = true;
            } else {
                succ = false;
                console.log(err);
            }
        });
        return succ;
    }

    getAllSessions(): Session[] {
        const sessions = new Array<Session>();
        this.sessionsDb.find({}, function (err, newDoc) {
            if (newDoc) {
                console.log('loaded sessions');
                console.log(newDoc);
                newDoc.forEach(element => {
                    console.log(element);
                    try {
                        sessions.push(element as Session);
                    } catch (error) {
                        console.log(error);
                    }
                });
            } else {
                console.log(err);
            }
        });
        return sessions;
    }

}
