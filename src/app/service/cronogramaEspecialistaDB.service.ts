
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CronogramaEspecialista } from '../interface/horario-laboral.interface';


@Injectable({
  providedIn: 'root'
})
export class CronogramaEspecialistaDBService {

  private dataRef = collection(this.fs, 'cronogramaEspecialistas');

  constructor(private fs: Firestore) { }

  addData(newData: CronogramaEspecialista) {
    const docs = doc(this.dataRef, newData.id);
    setDoc(docs, newData);
  }

  getData(): Observable<CronogramaEspecialista[]> {
    return new Observable<CronogramaEspecialista[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Cronogramas: CronogramaEspecialista[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as CronogramaEspecialista;
          Cronogramas.push(one);
        });
        observer.next(Cronogramas);
      });
    });
  }

  modificar(dato: CronogramaEspecialista) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
     misHorarios:dato.misHorarios
    });
  }

  borrar(dato:CronogramaEspecialista) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }



  getDatoPorId(id: string): Promise<CronogramaEspecialista | null> {
    const docs = doc(this.dataRef, id);
    return getDoc(docs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const dato = docSnap.data() as CronogramaEspecialista;
          return dato;
        } else {
          return null;
        }
      })
  }


}


