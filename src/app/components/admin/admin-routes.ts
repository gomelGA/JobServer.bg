import { Routes } from "@angular/router";
import { AdminAllAdvertsComponent } from "./allAdvetrtisements/show-all-adverts.component";
import { AdminEditAdvertComponent } from "./editAdvertisement/admin-edit-advert.component";

export const adminRoutes: Routes = [
    { path: 'allAdverts', component: AdminAllAdvertsComponent },
    { path: 'editAdvert/:id', component: AdminEditAdvertComponent }
]