
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../interface/turno.interface';
import { UsuarioGral } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnosDBService {

  private dataRef = collection(this.fs, 'turnos');

  constructor(private fs: Firestore) { }

  addData(newData: Turno) {
    const docs = doc(this.dataRef);
    newData.id = docs.id;
    setDoc(docs, newData);
  }

  getData(user:UsuarioGral): Observable<Turno[]> {
    return new Observable<Turno[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const Turnos: Turno[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Turno;
          if((user.Rol == 'paciente' && one.paciente.id == user.id) ||
             (user.Rol == 'especialista' && one.especialista.id == user.id) ||
              user.Rol == 'admin'){
            Turnos.push(one);
          }
        });
        observer.next(Turnos);
      });
    });
  }

  modificar(dato: Turno) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {

    });
  }

  borrar(dato:Turno) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


