
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CronogramaAtencion, CronogrmaQuincena } from '../interface/cronograma-atencion.interface';


@Injectable({
  providedIn: 'root'
})
export class CronogramaTurnosDBService {

  private dataRefQuincena = collection(this.fs, 'cronogramasTurnos');
  private dataRef = collection(this.fs, 'cronogramasDia');

  constructor(private fs: Firestore) { }

  addData(newData: CronogramaAtencion) {

    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  addDataQuincena(newData: CronogrmaQuincena) {
    const docs = doc(this.dataRefQuincena);
    newData.id = docs.id;
    setDoc(docs, newData);
  }


  getDataQuincena(): Promise<CronogrmaQuincena | null> {
    const docs = doc(this.dataRefQuincena, 'yh915kxj5kzbatVIGvd2');
    return getDoc(docs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const dato = docSnap.data() as CronogrmaQuincena;
          return dato;
        } else {
          return null;
        }
      })
  }

  modificarQuincena(dato: CronogrmaQuincena) {
    const docs = doc(this.dataRefQuincena, dato.id);
    updateDoc(docs, {
      quincena: dato.quincena
    });
  }


  getData(): Observable<CronogramaAtencion[]> {
    return new Observable<CronogramaAtencion[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Cronogramas: CronogramaAtencion[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as CronogramaAtencion;
          Cronogramas.push(one);
        });
        observer.next(Cronogramas);
      });
    });
  }

  modificar(dato: CronogramaAtencion) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      turnos: dato.turnos
    });
  }

  borrar(dato: CronogramaAtencion) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }



  getDatoPorId(id: string): Promise<CronogramaAtencion | null> {
    const docs = doc(this.dataRef, id);
    return getDoc(docs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const dato = docSnap.data() as CronogramaAtencion;
          return dato;
        } else {
          return null;
        }
      })
  }


}


