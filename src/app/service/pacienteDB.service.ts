
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteDBService {

  private dataRef = collection(this.fs, 'pacientes');

  constructor(private fs: Firestore) { }

  addData(newData: Paciente):Promise<any> {
    return addDoc(this.dataRef, newData);
  }

  getData(): Observable<Paciente[]> {
    return new Observable<Paciente[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Pacientes: Paciente[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Paciente;
          Pacientes.push(one);
        });
        observer.next(Pacientes);
      });
    });
  }

}
