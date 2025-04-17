import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  filterAnimals(query: string, gender: string, type: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((animals: any[]) => {
        return animals.filter(animal => {
          const matchesQuery = animal.name.toLowerCase().includes(query.toLowerCase()) ||
                               animal.breed.toLowerCase().includes(query.toLowerCase());
          const matchesGender = gender === 'All' || animal.gender === gender;
          const matchesType = type === 'All' || animal.type === type;
          return matchesQuery && matchesGender && matchesType;
        });
      })
    );
  }
}