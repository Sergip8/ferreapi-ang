import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { SearchParameters, UserPagination, UserType } from '../../models/user';


const baseUrl = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  getPagiantedUsers(params: SearchParameters){
    return this.http.post<UserPagination>(baseUrl+ 'users/paginated', params)
  }
  getUserInfo(id: number, role: UserType){
    return this.http.get<any>(baseUrl+ `users/${id}/role/${role}`)
  }
  updateUser(id: number, data: any){
    return this.http.put<any>(baseUrl+ `${id}/update`, data)
  }
  updateUserInfo(id: number, role: string, data: any){
    return this.http.patch<any>(baseUrl+ `users/${id}/role/${role}`, data)
 
  }
  
}

