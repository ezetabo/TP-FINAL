
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteDBService {

  private dataRef = collection(this.fs, 'pacientes');

  constructor(private fs: Firestore) { }

  addData(newData: Paciente) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
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

  modificar(dato: Paciente) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Nombre: dato.Nombre,
      Apellido: dato.Apellido,
      Edad: dato.Edad,
      Dni: dato.Dni,
      ObraSocial: dato.ObraSocial,
      Email: dato.Email,
      Password: dato.Password,
      Imagen: dato.Imagen,
      Imagen2: dato.Imagen2,

    });
  }

  borrar(dato:Paciente) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


