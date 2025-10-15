import { Component, inject } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact, NewContact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule,ContactListItem, FormsModule],
  templateUrl: './contact-list-page.html',
  styleUrl: './contact-list-page.scss'
})
export class ContactListPage {

  authService = inject(Auth)
  contactsService = inject(ContactsService)


  ngOnInit() {
    this.contactsService.getContacts();
  }

  async createContact(form:any){
    const newContact:NewContact = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      number: form.number,
      company: form.company,
      description: form.description,
      image: form.image
    }

    const ok = await this.contactsService.createContact(newContact);

    if (ok) {
      this.contactsService.getContacts();
    }
  }

  botonCartel(){
    
  }
}


