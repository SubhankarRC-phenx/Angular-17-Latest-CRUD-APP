import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{


  posts:Post[]=[];

  constructor(
    public postService:PostService,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data:Post[])=>{
      this.posts = data;
      console.log(this.posts);

    })
  }

  deletePost(id:number){
    this.postService.delete(id).subscribe(res =>{
      this.posts = this.posts.filter(item=>item.id !==id);
      console.log(this.posts);

      alert("Data Delete Successfully....!")
    })
  }



}
