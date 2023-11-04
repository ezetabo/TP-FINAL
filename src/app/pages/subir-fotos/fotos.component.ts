import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MrkdwnDBService } from 'src/app/service/mrkdnDB.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent {

  public myForm: FormGroup = this.fb.group({
    Nombre: [''],
    Imagen: [''],
  });

  constructor(private fb: FormBuilder, private storageService: StorageService, private mrkdwn: MrkdwnDBService) { }

  cargarImagen(event: any): void {
    let archivos = event.target.files;
    let nombre = this.myForm.controls['Nombre'].value;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.storageService.subirImagenMRKDW(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
          this.myForm.controls['Imagen'].setValue(urlImagen);

      });
    }
  }


  onSubmit() {
    this.mrkdwn.addData({id:'',nombre: this.myForm.controls['Nombre'].value, imagen: this.myForm.controls['Imagen'].value});
    this.myForm.reset();
    this.myForm.controls['Imagen'].setValue('');
  }


}
