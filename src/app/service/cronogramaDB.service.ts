
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cronograma } from '../interface/horario-laboral.interface';


@Injectable({
  providedIn: 'root'
})
export class CronogramaDBService {

  private dataRef = collection(this.fs, 'cronogramas');

  constructor(private fs: Firestore) { }

  addData(newData: Cronograma) {
    const docs = doc(this.dataRef, newData.id);
    setDoc(docs, newData);
  }

  getData(): Observable<Cronograma[]> {
    return new Observable<Cronograma[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Cronogramas: Cronograma[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Cronograma;
          Cronogramas.push(one);
        });
        observer.next(Cronogramas);
      });
    });
  }

  modificar(dato: Cronograma) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
     misHorarios:dato.misHorarios
    });
  }

  borrar(dato:Cronograma) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }



  getDatoPorId(id: string): Promise<Cronograma | null> {
    const docs = doc(this.dataRef, id);
    return getDoc(docs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const dato = docSnap.data() as Cronograma;
          return dato;
        } else {
          return null;
        }
      })
  }


}


