
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';


@Injectable({
  providedIn: 'root'
})

export class UsuarioDBService {

  private dataRef = collection(this.fs, 'usuarios');
  constructor(private fs: Firestore) { }

  addData(newData: Usuario):Promise<any> {
    return addDoc(this.dataRef, newData);
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

}
