import { Injectable } from '@angular/core';
import { Session, Class } from '../models';
import { ClassesService } from './classesService';
import { ElectronService } from 'ngx-electron';
import { LoggerService } from './loggerService';

@Injectable()
export class SessionService {

    private sessionsDb: any;

    constructor(private classesService: ClassesService, private electronService: ElectronService, private loggerService: LoggerService) {
        const Datastore = require('nedb');
        const sessionsPath = this.electronService.remote.app.getPath('userData') + '\sessions.sessions.db';
        this.sessionsDb = new Datastore({ filename: sessionsPath, autoload: true });

    }



    persistSession(session: Session): Session {
        const logger = this.loggerService;
        this.sessionsDb.insert(session, function (err, newDoc) {
            if (newDoc) {
                session._id = newDoc._id;
            } else {
                logger.displayError('Internal data error', 'Could not persist session data in database', err);
            }
        });
        return session;
    }
    updateSession(session: Session): Boolean {
        let succ: boolean;
        const logger = this.loggerService;
        this.sessionsDb.update({ _id: session._id }, session, {}, function (err, newDoc) {
            if (newDoc) {
                succ = true;
            } else {
                succ = false;
                logger.displayError('Internal data error', 'Could not update session data in database', err);
            }
        });
        return succ;
    }

    deleteSession(session: Session): Boolean {
        let succ: boolean;
        const logger = this.loggerService;
        this.sessionsDb.remove({_id: session._id}, function(err, numRemoved){
            if (numRemoved === 1) {
                succ = true;
            } else {
                succ = false;
            }
                logger.displayError('Internal data error', 'Could not delete session data from database', err);
        });
        return succ;
    }

    getAllSessions(): Session[] {
        const sessions = new Array<Session>();
        const logger = this.loggerService;
        let succ = true;
        let parseError: string;
        this.sessionsDb.find({}, function (err, newDoc) {
            if (newDoc) {
                newDoc.forEach(element => {
                    try {
                        sessions.push(element as Session);
                    } catch (err) {
                        succ = false;
                            parseError = err;
                    }
                });
                if (!succ) {
                    logger.displayError('Internal data error',
                                                    'Could not parse session data while reading from database', err);
                }
            } else {
                logger.displayError('Internal data error', 'Could not read session data in database', err);
            }
        });
        return sessions;
    }

}
