import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  posts:Post[] = [];
  
  constructor(private service:FirebaseServiceService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(
      post => {
        this.posts = post;
      }
    );   
  }


}
