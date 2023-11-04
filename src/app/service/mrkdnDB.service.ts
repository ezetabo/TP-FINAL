import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mrkdwn } from '../interface/mrkdwn.interfaz';

@Injectable({
  providedIn: 'root'
})
export class MrkdwnDBService {

  private dataRef = collection(this.fs, 'mrkdwn');

  constructor(private fs: Firestore) { }

  addData(newData: Mrkdwn) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  getData(): Observable<Mrkdwn[]> {
    return new Observable<Mrkdwn[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Mrkdwns: Mrkdwn[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Mrkdwn;
          Mrkdwns.push(one);
        });
        observer.next(Mrkdwns);
      });
    });
  }

  modificar(dato: Mrkdwn) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Nombre: dato.nombre,
    });
  }

  borrar(dato:Mrkdwn) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }


}
