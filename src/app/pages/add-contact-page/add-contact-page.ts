import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Contact, NewContact } from '../../interfaces/contacto';
import { Auth } from '../../services/auth';
import { ContactsService } from '../../services/contacts-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-contact-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './add-contact-page.html',
  styleUrl: './add-contact-page.scss'
})
export class AddContactPage implements OnInit {
  authService = inject(Auth)
  contactsService = inject(ContactsService)
  router = inject(Router);
  errorEnBack = false;
  idContacto = input<string>();
  contactoBack: Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm")

  async ngOnInit() {
    if (this.idContacto()) {
      const contacto: Contact | null = await this.contactsService.getContactById(this.idContacto()!);
      console.log(contacto)
      if (contacto) {
        console.log(contacto)
        this.contactoBack = contacto;
        this.form()?.setValue({
          address: contacto.address,
          company: contacto.company,
          email: contacto.email,
          firstName: contacto.firstName,
          image: contacto.image,
          description: contacto.description,
          lastName: contacto.lastName,
          number: contacto.number
        })
      }
    }
  }

  async handleFormSubmission(form: any) {
    this.errorEnBack = false;
    const newContact: NewContact = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      number: form.number,
      company: form.company,
      description: form.description,
      image: form.image
    }
    let res;
    if (this.idContacto()) {
      res = await this.contactsService.editContact({
        ...newContact, id: this.contactoBack!.id, isFavorite: false})
    } else {
      res = await this.contactsService.createContact(newContact)
    }
    if (!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);



    // async register(form: Form) {
    //     this.errorRegister = false;
    //     if (
    //       !form.firstName ||
    //       !form.lastName ||
    //       !form.email ||
    //       !form.password ||
    //       !form.password2 ||
    //       form.password !== form.password2
    //     ) {
    //       this.errorRegister = true;
    //       return;
    //     }

    //     this.isLoading = true;
    //     const ok = await this.userService.register({
    //       firstName: form.firstName,
    //       lastName: form.lastName,
    //       email: form.email,
    //       password: form.password,
    //     });
    //     this.isLoading = false;

    //     if (!ok) {
    //       this.errorRegister = true;
    //     }
    //   }
  }}
