import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  postCollection: AngularFirestoreCollection<Post>;
  postDocument: AngularFirestoreDocument<Post>;
  posts: Observable<Post[]>;
  post: Observable<Post>;
  idPost:string;
  constructor(
    private firestore: AngularFirestore
  ) {
    this.postCollection = firestore.collection('posts', ref => ref.orderBy('title', 'asc'));
  }


  addPost(post:Post){
    this.postCollection.add(post);

  }
  getPosts(): Observable<Post[]> {
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(chage => {
        return chage.map(action => {
          const data = action.payload.doc.data() as Post;
          data.id = action.payload.doc.id;
          //this.idPost = action.payload.doc.id;
          return data;
        }

        )
      })
    );
    return this.posts;
  }


}
