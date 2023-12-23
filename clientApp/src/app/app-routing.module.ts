import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home/home.component';
import { MemberListComponent } from './Component/members/member-list/member-list.component';
import { MemberDetailComponent } from './Component/members/member-detail/member-detail.component';
import { MessagesComponent } from './Component/members/messages/messages.component';
import { ListsComponent } from './Component/members/lists/lists.component';
import { GuardGuard } from './_guard/-guard.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "member",
    component: MemberListComponent,
    canActivate: [GuardGuard]
  },
  {
    path: "member/:id",
    component: MemberDetailComponent,
    canActivate: [GuardGuard]
  },
  {
    path: "list",
    component: ListsComponent
  },
  {
    path: "message",
    component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
