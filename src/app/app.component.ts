import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'

  posts: Observable<any>;
  newPost: Observable<any>;

  constructor(private http: HttpClient){}

  // create get
  getPosts() {
    let params = new HttpParams().set('userId', '1');
    let headers = new HttpHeaders().set('Authorization', 'auth-token');

    this.posts = this.http.get(this.ROOT_URL + '/posts', { params, headers });

  }

  // create post
  createPost() {
     const data: Post = {
      id: null,
      userId: 23,
      title: 'My New Post',
      body: 'Hello World!!'
    }

    // sending a post request
    this.newPost = this.http.post<Post>(this.ROOT_URL + '/posts', data)
      .map(post => post.title)



    // create an error
    this.newPost = this.http.post(this.ROOT_URL + '/foo', data)
    .retry(3)
    .catch( err => {
      console.log(err);
      return Observable.of(err);
    })

  }


}
