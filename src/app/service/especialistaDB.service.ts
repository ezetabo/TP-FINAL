
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialista } from '../interface/especialista.interface';




@Injectable({
  providedIn: 'root'
})
export class EspecialistaDBService {

  private dataRef = collection(this.fs, 'especialistas');

  constructor(private fs: Firestore) { }

  addData(newData: Especialista) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
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

  modificar(dato: Especialista) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Nombre: dato.Nombre,
      Apellido: dato.Apellido,
      Edad: dato.Edad,
      Dni: dato.Dni,
      Email: dato.Email,
      Password: dato.Password,
      Imagen: dato.Imagen,
      Especialidades: dato.Especialidades,
      Autorizado: dato.Autorizado,

    });
  }

  borrar(dato:Especialista) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}
