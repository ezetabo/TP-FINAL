
import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Estado, Turno } from '../interface/turno.interface';
import { UsuarioGral } from '../interface/usuario-gral.interface';
import { esFechaVieja } from '../utils/listas';

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

  getData(user: UsuarioGral): Observable<Turno[]> {
    return new Observable<Turno[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const turnos: Turno[] = snap.docChanges()
          .map(change => change.doc.data() as Turno)
          .filter(one => this.cumpleCondiciones(one, user));
        turnos.forEach(turno => {
          if (esFechaVieja(turno.fecha)) {
            turno.estado = Estado.vencido;
          }
        });
        observer.next(turnos);
      });
    });
  }

  private cumpleCondiciones(turno: Turno, user: UsuarioGral): boolean {
    return (
      (user.Rol === 'paciente' && turno.paciente.id === user.id) ||
      (user.Rol === 'especialista' && turno.especialista.id === user.id) ||
      user.Rol === 'admin'
    );
  }

  getAllData(): Observable<Turno[]> {
    return new Observable<Turno[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const turnos: Turno[] = snap.docs.map(doc => doc.data() as Turno);
        observer.next(turnos);
      });
    });
  }

  modificar(dato: Turno) {
    const docs = doc(this.dataRef, dato.id);
    updateDoc(docs, {

    });
  }

  borrar(dato: Turno) {
    const docs = doc(this.dataRef, dato.id);
    deleteDoc(docs);
  }

}


