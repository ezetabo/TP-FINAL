
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../interface/historia-clinica.interface';
import { Paciente } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaDBService {

  private dataRef = collection(this.fs, 'historiasClinicas');

  constructor(private fs: Firestore) { }

  addData(newData: HistoriaClinica) {
    const docs = doc(this.dataRef, newData.paciente.id);
    setDoc(docs, newData);
  }

  getAllData(): Observable<HistoriaClinica[]> {
    return new Observable<HistoriaClinica[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const HistoriaClinicas: HistoriaClinica[] = snap.docs.map(doc => doc.data() as HistoriaClinica);
        observer.next(HistoriaClinicas);
      });
    });
  }

  getDatoPorId(pac: Paciente): Promise<HistoriaClinica | null> {
    const docs = doc(this.dataRef, pac.id);
    return getDoc(docs)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const dato = docSnap.data() as HistoriaClinica;
          return dato;
        } else {
          return null;
        }
      })
  }

  modificar(historia: HistoriaClinica) {
    const docs = doc(this.dataRef, historia.id);
    updateDoc(docs, {
      altura: historia.altura,
      peso: historia.peso,
      temperatura: historia.temperatura,
      presion:historia.presion,
      datos: historia.datos
    });

  }

  borrar(dato: HistoriaClinica) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


