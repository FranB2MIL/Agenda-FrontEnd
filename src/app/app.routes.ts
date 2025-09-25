import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';

import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { ContactListPage } from './pages/contact-list-page/contact-list-page';
import { LoggedLayout } from './layout/logged-layout/logged-layout';
import { GroupListPage } from './pages/group-list-page/group-list-page';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { onlyUserGuard } from './guards/only-user-guard-guard';
import { AddContactPage } from './pages/add-contact-page/add-contact-page';

export const routes: Routes = [
    {
        path:"login-page",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path:"register-page",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]
    },
    {
        //path vaio se abre cuando la pagina no tiene url mas que localhost
        path:"",
        component: LoggedLayout,
        canActivateChild: [onlyUserGuard],
        children: [
        {
            path:"contact-list-page",
            component: ContactListPage
        },
        {
            path:"contacts/:id",
            component: ContactDetailsPage
        },
        {
            path:"group-list-page",
            component: GroupListPage
        },
        {
            path:"add-contact-page",
            component: AddContactPage
        },
        {
            path:"contacts/:idContacto/edit",
            component: AddContactPage
        }
        

        ]
    }
];
