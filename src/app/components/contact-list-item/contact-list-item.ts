import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule, RouterLink],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  // contacto = input.required<string>();
  index = input.required<number>();
  esFavorito = input<boolean>()

  contacto = input.required<Contact>()

  contactsService = inject(ContactsService)
}
