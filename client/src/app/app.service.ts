import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders} from './headers'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Service {
  host: string = '';

  constructor(
    private http: Http,
  ){
  }

  getTodoList(){
    const url = this.host + '/todo';
    return this.http.get(url, { headers: contentHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setTodo(item){
    let body = JSON.stringify(item);
    const url = this.host+'/todo';
    return this.http.post(url, body, { headers: contentHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(id){
    const url = this.host + '/todo/'+id;
    return this.http.delete(url, { headers: contentHeaders})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  update(item){
    let body = JSON.stringify(item);
    const url = this.host+'/todo';
    return this.http.put(url, body, { headers: contentHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setTodoList(json){
    let body = JSON.stringify(json);
    const url = this.host+'/todo/json';
    return this.http.post(url, body, { headers: contentHeaders})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    alert(error.message);
    return Promise.reject(error.message || error);
  }
}




