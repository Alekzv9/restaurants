import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService {

    apiURL = environment.API_URL;

    constructor(private http: Http) { }

    getComments(saucerId: string){
        return this.http
        .get(this.apiURL + 'saucers/' + saucerId + '/comments')
        .map((response: Response) => response.json())
        .toPromise();
    }

    addComment(saucerId: string, data){
        data.date = new Date().toUTCString();
        //URL, Body, Headers
        return this.http
        .post(this.apiURL + 'saucers/' + saucerId + '/comments', data)
        .map((response: Response) => response.json())
        .toPromise();
    }
}