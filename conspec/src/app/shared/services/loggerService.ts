import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class LoggerService {


    constructor(private electronService: ElectronService) {
    }

    displayError(errorTitle: string, errorMessage: string, error: string) {
        const errorText = 'Error: '
                    + errorMessage
                    + ' Details: '
                    + error;
        this.electronService.remote.dialog.showErrorBox(errorTitle, errorText);
    }

}
