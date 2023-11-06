
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HorarioLaboral } from '../interface/horario-laboral.interface';



@Injectable({
  providedIn: 'root'
})
export class HorarioLaboralDBService {

  private dataRef = collection(this.fs, 'horario-Laboral');

  constructor(private fs: Firestore) { }

  addData(newData: HorarioLaboral) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
    return docs.id;
  }

  getData(): Observable<HorarioLaboral[]> {
    return new Observable<HorarioLaboral[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const HorarioLaborals: HorarioLaboral[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as HorarioLaboral;
          HorarioLaborals.push(one);
        });
        observer.next(HorarioLaborals);
      });
    });
  }

  modificar(dato: HorarioLaboral) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
     horarios:dato.horarios
    });
  }

  borrar(dato:HorarioLaboral) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


