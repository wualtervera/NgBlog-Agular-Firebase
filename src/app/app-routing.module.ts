import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { PostComponent } from './components/post/post.component';


const routes: Routes = [
  {
    path: '',
    component: PostComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
  ,
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
