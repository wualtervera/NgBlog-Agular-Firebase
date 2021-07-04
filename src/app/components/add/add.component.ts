import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  title:string;
  description:string;
  image:string;
  @ViewChild("imageUri", {static: true}) imageUri:ElementRef;

  error:string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private router:Router,private service:FirebaseServiceService, private fireStorage:AngularFireStorage) { }

  ngOnInit(): void {
  }
  uploadImage(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    //console.log(file);
    const filePath = `/postimg/post_${id}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL() )).subscribe();
  }

  agregarPost(){
    this.image = this.imageUri.nativeElement.value;  //get Url image
    
    if(this.title != ''.trim() && this.description != ''.trim() && this.image != ''.trim()){
      let post:Post = {
        title: this.title,
        description: this.description,
        image: this.image
      }
  
      this.service.addPost(post);
      this.router.navigate(['/']);
    }else{
      this.error = "*Llene los campos correctamente";
    }
  }
}
