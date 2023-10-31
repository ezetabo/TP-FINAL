
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';


@Injectable({
  providedIn: 'root'
})

export class UsuarioDBService {

  private dataRef = collection(this.fs, 'usuarios');
  constructor(private fs: Firestore) { }

  addData(newData: Usuario) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  getData(): Observable<Usuario[]> {
    return new Observable<Usuario[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const usuarios: Usuario[] = [];
        snap.docChanges().forEach(x => {

          const one = x.doc.data() as Usuario;

          usuarios.push(one);
        });
        observer.next(usuarios);
      });
    });
  }

  modificar(dato:Usuario) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {
      Apellido: dato.Apellido,
      Nombre: dato.Nombre,
      Edad: dato.Edad,
      Dni: dato.Dni,
      Email: dato.Email,
      Password: dato.Password,
      Imagen: dato.Imagen,
      EsAdmin: dato.EsAdmin,
      Autorizado: dato.Autorizado,
    });
  }

  borrar(dato:Usuario) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }


}
