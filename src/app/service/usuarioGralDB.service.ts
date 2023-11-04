
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioGral } from '../interface/usuario-gral.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGralDBService {

  private dataRef = collection(this.fs, 'UsuarioGral');

  constructor(private fs: Firestore) { }

  addData(newData: UsuarioGral) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  getData(): Observable<UsuarioGral[]> {
    return new Observable<UsuarioGral[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const UsuarioGrals: UsuarioGral[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as UsuarioGral;
          UsuarioGrals.push(one);
        });
        observer.next(UsuarioGrals);
      });
    });
  }

  modificar(dato: UsuarioGral) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Nombre: dato.Nombre,
      Apellido: dato.Apellido,
      Edad: dato.Edad,
      Dni: dato.Dni,
      Email: dato.Email,
      Password: dato.Password,
      Imagen: dato.Imagen,
      Rol: dato.Rol,
      Especialidades: dato.Especialidades,
      Autorizado: dato.Autorizado,
      Imagen2: dato.Imagen2,
      ObraSocial: dato.ObraSocial,
    });
  }

  borrar(dato:UsuarioGral) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


