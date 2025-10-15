import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  authService = inject(Auth);
  contactos: Contact[] = [];
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  async createContact(nuevoContacto: NewContact) {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevoContacto),
    });

    if (res.ok) {
      const contact = await res.json()
      this.contactos.push(contact)
      return contact;

    } else {
      // mensaje de error
      return null;
    }
  }

  async deleteContact(contact: Contact) {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts' + "/" + contact.id
      , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(contact.id)
      }
    );
    this.contactos = this.contactos.filter(contacto => contacto.id !== contact.id);
  }

  async editContact(contact: Contact) {
    const res = await fetch(this.URL_BASE + "/" + contact.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(contact)
      });
    if (!res.ok) return;
    this.contactos = this.contactos.map(oldContact => {
      if (oldContact.id === contact.id) return contact;
      return oldContact
    })
    return contact;
  }

  async getContacts() {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token
      },
    })
    if (res.ok) {
      this.contactos = await res.json();
    }
  }
  async getContactById(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token
      },
    })
    if (res.ok) {
      const resJson: Contact = await res.json();
      return resJson;
    }
    return null
  }
  async setFavourite(id: string | number) {
    const res = await fetch(this.URL_BASE + "/" + id + "/favorite",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });

  }

}
