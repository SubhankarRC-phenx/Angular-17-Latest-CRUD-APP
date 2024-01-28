import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from '../post';
// import { json } from 'stream/consumers';
// import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  private apiURL = 'https://jsonplaceholder.typicode.com';

  // Use HTTPHeader for Local to server for given acces local unknown user to sever

  // httpOptions ={
  //   headers: new HttpHeaders({
  //     'Cotent-Type':'application/json'
  //   })
  // }


  http_headers_urlencoded = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  http_headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient:HttpClient,
  ) { }

  // Get All Methods  :-

  // getAll(): Observable<any>{
  //   return this.httpClient.get(this.apiURL+'/posts/').pipe(catchError((error:HttpErrorResponse) =>{
  //     return throwError(error);
  //   })
  //   );
  // }

  getAll(): Observable<any>{
    return this.httpClient.get(this.apiURL+'/posts/',
      {
        headers: this.http_headers_urlencoded,
      }
    );
  }





  // Create :-

  // create(post:Post): Observable<any>{
  //   return this.httpClient.post(this.apiURL+'/posts/',JSON.stringify(post),this.
  //   httpOptions).pipe(catchError((error:HttpErrorResponse) =>{
  //     return throwError(error);
  //   }))
  // }

  create(post:Post): Observable<any>{
    return this.httpClient.post(this.apiURL+'/posts/',JSON.stringify(post),
      {
        headers: this.http_headers_urlencoded,
      }
    );
  }

  // Find the data by ID : -

  // find(id:number): Observable<any>{
  //   return this.httpClient.get(this.apiURL+'/posts/'+id).pipe(catchError((error:HttpErrorResponse) =>{
  //     return throwError(error);
  //   })
  //   )
  // }

  find(id:number): Observable<any>{
    return this.httpClient.get(this.apiURL+'/posts/'+id,
      {
        headers: this.http_headers_urlencoded,
      }
    )
  }


  // Update data :-

  // update(id:number, post:Post): Observable<any>{
  //   return this.httpClient.put(this.apiURL+'/posts/'+id, JSON.stringify(post),this.
  //   httpOptions).pipe(catchError((error:HttpErrorResponse) =>{
  //     return throwError(error);
  //   }))

  // }


  update(id:number, post:Post): Observable<any>{
    return this.httpClient.put(this.apiURL+'/posts/'+id, JSON.stringify(post),
      {
        headers: this.http_headers_urlencoded,
      }
    );

  }

  // Delete Data :-

  // delete(id:number): Observable<any>{
  //   return this.httpClient.delete(this.apiURL+'/posts/'+id).pipe(catchError((error:HttpErrorResponse) =>{
  //     return throwError(error);
  //   })
  //   )
  // }

  delete(id:number): Observable<any>{
    return this.httpClient.delete(this.apiURL+'/posts/'+id,
      {
        headers: this.http_headers_urlencoded,
      }
    );
  }

}
