import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  private router = inject(Router);

  contacto = input.required<Contact>()

  contactsService = inject(ContactsService)
  

  showDeleteModal() {
    Swal.fire({
      title: "Borrar contacto",
      text: "El borrado es permanente, ¿Estas seguro?",
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Borrar definitivamente.",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.contactsService.deleteContact(this.contacto())
          ;
      }
    });
  }
}
