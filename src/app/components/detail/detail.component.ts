import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  posts:Post[] = [];
  
  idPost:string;
  constructor(public idPostUrl:ActivatedRoute ,private service:FirebaseServiceService) { 
    this.idPost = this.idPostUrl.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.service.getPosts().subscribe(
      post => {
        this.posts = post;
      }
    ); 
  }

}
