import { Component, OnInit } from '@angular/core';
import { Contact } from './contacts';
import { ContactsService } from './contacts.services';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

import { from } from 'rxjs';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  searchedContacts: Contact[];
  searchName: string;
  myForm: FormGroup;
  mySortForm: FormGroup;
  myUpdateForm: FormGroup;
  contact: Contact;
  addingContact: boolean = false;
  sortingContact: boolean = false;
  updatingContact: boolean = false;
  constructor(private contactSer: ContactsService) {
    this.contacts = this.contactSer.getContacts();
    this.searchedContacts = this.contactSer.getSearchedContacts();
    this.myForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      phoneno: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
    });
    this.mySortForm = new FormGroup({
      sorton: new FormControl(1, Validators.required),
      sorttype: new FormControl(1, Validators.required)
    });
    this.myUpdateForm = new FormGroup({
      ufirstname: new FormControl(null, Validators.required),
      ulastname: new FormControl(null, Validators.required),
      uphoneno: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(10)]),
    });
  }
  ngOnInit(): void {
  }
  get firstname() {
    return this.myForm.get('firstname');
  }
  get lastname() {
    return this.myForm.get('lastname');
  }
  get phoneno() {
    return this.myForm.get('phoneno');
  }
  get sorton() {
    return this.mySortForm.get('sorton');
  }
  get sorttype() {
    return this.mySortForm.get('sorttype');
  }
  get ufirstname() {
    return this.myUpdateForm.get('ufirstname');
  }
  get ulastname() {
    return this.myUpdateForm.get('ulastname');
  }
  get uphoneno() {
    return this.myUpdateForm.get('uphoneno');
  }
  searchContacts() {
    this.searchedContacts = this.contactSer.getSearchedContacts(this.searchName ? this.searchName.toLowerCase(): undefined);
  }
  addContactBox() {
    this.addingContact = true;
  }
  addContact(choice: number) {
    switch(choice) {
      case 1: {
        if(this.myForm.valid) {
          this.contactSer.addContact(new Contact(this.firstname.value, this.lastname.value, this.phoneno.value));
          this.myForm.reset();
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.myForm.reset()
        break;
      }
      case 3: {
        this.myForm.reset()
        this.addingContact = false;
        break;
      }
    } 
  }
  sortContactBox() {
    this.sortingContact = true;
  }
  sortContact(choice: number) {
    switch(choice) {
      case 1: {
        if (this.mySortForm.valid) {
          this.contactSer.sortContact(this.sorton.value, this.sorttype.value);
          this.sortingContact = false;
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.mySortForm.patchValue({sorton: 1, sorttype: 1});
        break;
      }
      case 3: {
        this.mySortForm.patchValue({sorton: 1, sorttype: 1});
        this.sortingContact = false;
        break;
      }
    }
  }
  updateContactBox(cont: Contact) {
    this.myUpdateForm.patchValue({
      ufirstname: cont.firstName,
      ulastname: cont.lastName,
      uphoneno: cont.phoneNo
    });
    this.contact = cont;
    this.updatingContact = true;
  }
  updateContact(choice: number) {
    switch(choice) {
      case 1: {
        if (this.myUpdateForm.valid) {
          this.contactSer.updateContact(this.contact, new Contact(this.ufirstname.value, this.ulastname.value, this.uphoneno.value));
          this.updatingContact = false;
          this.contact = new Contact();
          this.searchContacts();
        }
        break;
      }
      case 2: {
        this.updateContactBox(this.contact);
        break;
      }
      case 3: {
        this.myUpdateForm.reset()
        this.updatingContact = false;
        break;
      }
    }
  }
  deleteContact(cont: Contact) {
    if (this.contact === cont) {
      this.updatingContact = false;
      this.contact = new Contact();
    }
    this.contactSer.deleteContact(cont);
    this.searchContacts();
  }
}
