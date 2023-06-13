import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<any> {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next(null);
        // On retourne une erreur personnalisée quand le chargement des données n'a pas fonctionné
        return ('Une erreur s\'est produite lors du chargement des données.');
      })
    );
  }

  getOlympics(): Observable<any> {
    return this.olympics$.asObservable();
  }
}
