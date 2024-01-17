import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{

  form:FormGroup;



  constructor(public postService:PostService, private router:Router){
  this.form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required)
  })
  }

  ngOnInit(){

  }

  get f(){
    return this.form.controls;
  }

  submit(): void{
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any)=>{
      alert("Post Created...");

      this.router.navigate(['post/index']);
    })

  }
}
