import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  /*frmUserId = new FormControl('', [Validators.required]);
  frmId = new FormControl('', [Validators.required]);
  frmTitle = new FormControl('', [Validators.required]);
  frmBody = new FormControl('', [Validators.required]);*/

  postForm:  FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PostService,
    ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      userId :['', [Validators.required]],
      title :['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      body :['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  submitPost(){
    if(this.postForm.valid){
      this.service.postPost(this.postForm.value).subscribe(
        (data: {}) => {
          console.log(data);
        }
      );
    }
  }

}
