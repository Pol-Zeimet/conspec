
export class Member {
    
    name: String;
    lastName: String;
    email: String;
    tel: String;
    controlled: boolean;

    constructor(){
        this.name = undefined;
        this.lastName = undefined;
        this.tel = undefined;
        this.email = undefined;
        this.controlled = false;
    }
}