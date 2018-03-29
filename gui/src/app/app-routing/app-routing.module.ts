import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component'
import { HomeComponent } from '../home/home.component'
import { CostComponent } from '../cost/cost.component'
import { ContactComponent } from '../contact/contact.component'

const routes: Routes = [
    {
	path: 'welcome',
	component: WelcomeComponent,
    },
    {
	path: 'cost',
	component: CostComponent,
    },
    {
	path: 'contact',
	component: ContactComponent,
    },
    {
	path: ':param',
	component: HomeComponent,
    },
    {
	path: '',
        pathMatch: 'full',
	redirectTo: 'all',
    },
];

export const routing = RouterModule.forRoot(routes);

/*
 *
 * const appRoutes: Routes = [
 *   { path: 'add', component: MediaItemFormComponent },
 *     { path: ':medium', component: MediaItemListComponent },
 *       { path: '', pathMatch: 'full', redirectTo: 'all' }
 *       ];
 *
@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [
	RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
*/
