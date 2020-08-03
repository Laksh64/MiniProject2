import { Component } from '@angular/core';
import { Contact } from './contacts';
import { stringify } from '@angular/compiler/src/util';

export class ContactsService {
    contacts: Contact[];
    searchedContacts: Contact[];
    constructor() {
        this.contacts =[];
        this.contacts.push(new Contact('Lakshya', 'Khanna', '8646535438'));
        this.contacts.push(new Contact('Ayush', 'Sharma', '1538611166'));
        this.contacts.push(new Contact('Tiger', 'shroff', '6848666648'));
        this.contacts.push(new Contact('Akshay', 'Kumar', '9688654321'));
        this.contacts.push(new Contact('Ram', 'Nivas', '6684543431'));
        this.contacts.push(new Contact('Roy', 'Patel', '5248844684'));
    }
    getContacts(): Contact[] {
        return this.contacts;
    }
    getSearchedContacts(name?: string): Contact[] {
        this.searchedContacts = [];
        if (name === undefined)
            return this.contacts;
        this.contacts.forEach(contact => {
            if ((contact.firstName + " " + contact.lastName + " " + contact.phoneNo).toLowerCase().includes(name))
                this.searchedContacts.push(contact)
        });
        return this.searchedContacts;
    }
    addContact(contact: Contact): void {
        this.contacts.push(contact);
    }
    sortContact(sortOn: number, sortType: number): void {
        this.contacts.sort((a, b) => {
            if (sortOn == 1) {
                if (sortType == 1)
                    return (a.firstName + " " + a.lastName).toLowerCase() > (b.firstName + " " + b.lastName).toLowerCase() ? 1 : -1;
                else
                    return (a.firstName + " " + a.lastName).toLowerCase() > (b.firstName + " " + b.lastName).toLowerCase() ? -1 : 1;
            }
            else {
                if (sortType == 1)
                    return a.phoneNo > b.phoneNo ? 1 : -1;
                else
                    return a.phoneNo > b.phoneNo ? -1 : 1;
            }
        });
    }
    updateContact(cont: Contact, updatedContact: Contact): void {
        this.contacts.forEach( (contact, index) => {
            if (contact === cont)
                this.contacts[index] = updatedContact;
        });
    }
    deleteContact(cont: Contact): void {
        this.contacts.forEach( (contact, index) => {
            if (contact === cont)
                this.contacts.splice(index, 1);
        });
    }  
}