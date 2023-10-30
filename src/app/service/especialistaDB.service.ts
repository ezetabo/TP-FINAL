
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialista } from '../interface/especialista.interface';




@Injectable({
  providedIn: 'root'
})
export class EspecialistaDBService {

  private dataRef = collection(this.fs, 'especialistas');

  constructor(private fs: Firestore) { }

  addData(newData: Especialista):Promise<any> {
    return addDoc(this.dataRef, newData);
  }

  getData(): Observable<Especialista[]> {
    return new Observable<Especialista[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const especialistas: Especialista[] = [];
        snap.docChanges().forEach(x => {

          const one = x.doc.data() as Especialista;

          especialistas.push(one);
        });
        observer.next(especialistas);
      });
    });
  }



}
