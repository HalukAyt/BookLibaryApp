import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RateBookRequest, RateBookResultDto } from './star-rating.model'; // Yolu ayarlayın
import { UserBookRatingDto } from '../components/book/book.model';

@Injectable({
  providedIn: 'root'
})
export class StarRatingService {
  private apiUrl = 'https://booklibaryapi.azurewebsites.net/api/Book'; // Gerçek API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  rateBook(bookName: string, rating: number, userName: string): Observable<RateBookResultDto> {
    const request: RateBookRequest = { BookName: bookName, Rating: rating };
    return this.http.post<RateBookResultDto>(`${this.apiUrl}/rate-book?userName=${userName}`, request);
  }
  // ShowUserRating(bookName:string, userName:string): Observable<any>{
  //   return this.http.get(`${this.apiUrl}/getUserRating?bookName=${bookName}&userName=${userName}`);
  // }
  getUserBookRating(bookName: string, userName: string): Observable<UserBookRatingDto> {
    return this.http.get<UserBookRatingDto>(`${this.apiUrl}/getUserRating/${bookName}/${userName}`);
  }
}

