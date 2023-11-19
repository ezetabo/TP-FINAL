import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lista } from '../interface/listas.interface';

@Injectable({
  providedIn: 'root'
})
export class EspcialidadDBService {

  private dataRef = collection(this.fs, 'especialidades');

  constructor(private fs: Firestore) { }

  addData(newData: Lista) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  getData(): Observable<Lista[]> {
    return new Observable<Lista[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Listas: Lista[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Lista;
          Listas.push(one);
        });
        observer.next(Listas);
      });
    });
  }

  modificar(dato: Lista) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Nombre: dato.nombre,
    });
  }

  borrar(dato: Lista) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }


}
