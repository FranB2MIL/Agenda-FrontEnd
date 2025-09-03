import { Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
   contactos:Contact[] = [
    {
      firstName: 'Gonzalo',
      lastName: 'Bechara',
      address: 'San Lorenzo',
      email: 'gbechara@austral.edu.ar',
      number: '123456',
      company: 'Austral',
      id: 0,
      isFavorite: false,
      description: 'Hola',
      image: ''
  }
  ];
  contactsService: any;

  
  createContact(nuevoContacto:NewContact){
    const contacto:Contact = {
      ...nuevoContacto,
      id: Math.random(),
      isFavorite: false
    }

    this.contactos.push(contacto)
  }

  crearContactoEjemplo(){
    this.contactsService.createContact({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      number: '',
      company: '',
      description: '',
      image: ''
    })
  }
  deleteContact(id:number){
    this.contactos = this.contactos.filter(contacto => contacto.id !== id);
  }

  editContact(){}

  getContacts(){}

}

 

