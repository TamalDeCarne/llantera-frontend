import { Component, OnInit } from '@angular/core';
import { PostService } from  '../../services/post.service';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent implements OnInit {

  postsList: any = [];
  constructor(private postsService:PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    return this.postsService.getPosts().subscribe(
      (data: {}) => {
        this.postsList = data;
        console.log(this.postsList);
      }
    )
  }

  loadUsers() {

  }
}
