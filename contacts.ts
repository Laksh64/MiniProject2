export class Contact {
    firstName: string;
    lastName: string;
    phoneNo: string;
    constructor(fn?, ln?, num?) {
        this.firstName = fn;
        this.lastName = ln;
        this.phoneNo = num;
    }
}