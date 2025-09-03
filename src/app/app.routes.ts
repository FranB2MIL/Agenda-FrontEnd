import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';

import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { ContactListPage } from './pages/contact-list-page/contact-list-page';
import { LoggedLayout } from './layout/logged-layout/logged-layout';
import { GroupListPage } from './pages/group-list-page/group-list-page';

export const routes: Routes = [
    {
        path:"login-page",
        component: LoginPage
    },
    {
        //path vaio se abre cuando la pagina no tiene url mas que localhost
        path:"",
        component: LoggedLayout,
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
        }
        ]
    }
];
