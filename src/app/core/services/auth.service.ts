import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPerson, Person } from '../interfaces/person.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sessionOn = new BehaviorSubject(true);
  redirectUrl!: string;
  constructor() { }

  signIn(): Promise<Person> {
    return new Promise<Person>((resolve, reject) => {
      const person: IPerson = new Person('John', 'Doe', 44);
      resolve(person);
    })
  }

  isLoggedIn () : boolean {
    return this.sessionOn.value;
  }

  isLoggedInObservable(): BehaviorSubject<boolean> {
    return this.sessionOn;
  }

  signOut(): void { }
}
