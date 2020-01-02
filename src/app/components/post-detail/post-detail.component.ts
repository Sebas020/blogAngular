import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
	public post: Post;
  public identity;
  constructor(
  	private _postService: PostService,
  	private _route: ActivatedRoute,
  	private _router: Router,
    private _userService: UserService
  	) { 
      this.identity = this._userService.getIdenity();
  }

  ngOnInit() {
  	this.getPost();
  }

  getPost(){
  	//Sacar el id del post de la url
  	this._route.params.subscribe(params => {//Params es un array que al sacar los parámetros que se pasan por url los monta en un array
  		let id = +params['id'];
		//Petición ajax para sacar los datos
		this._postService.getPost(id).subscribe(
			response =>{
				if(response.status == 'success'){
					this.post = response.posts;
					console.log(this.post);
				}else{
					
				}
			},
			error =>{
				this._router.navigate(['/inicio']);
			}
		);
  	});
  }
}
