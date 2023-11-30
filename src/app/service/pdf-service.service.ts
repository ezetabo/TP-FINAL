import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import { Turno } from '../interface/turno.interface';
import { Especialista, Paciente } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() { }

  async descargarAtencionesPdf(turnos: Turno[]): Promise<void> {
    const pdf = new jspdf.jsPDF();
    const logoPath = '../../assets/logo.jpg';
    const logoDataUrl = await this.getBase64Image(logoPath);
    const lineHeight = 10;
    const linesPerPage = 10;

    turnos.forEach((turno, index) => {
      pdf.addImage(logoDataUrl, 'JPEG', 5, 5, 30, 30);
      pdf.text(`Antenciones de: ${this.getNombreCompleto(turno.especialista)}`, pdf.internal.pageSize.width / 2, 20, { align: 'center' });
      const fecha = new Date().toLocaleDateString();
      const fontSize = pdf.getFontSize();
      const fechaWidth = pdf.getStringUnitWidth(fecha) * fontSize / pdf.internal.scaleFactor;
      pdf.text(`${fecha}`, pdf.internal.pageSize.width - fechaWidth - 10, 20);
      const pageIndex = Math.floor(index / linesPerPage);
      const yPosition = 60 + (index % linesPerPage) * lineHeight + pageIndex * pdf.internal.pageSize.height;

      pdf.text(`${turno.dia} ${turno.fecha} ${turno.hora}`, 30, yPosition);
      pdf.text(`Paciente: ${this.getNombreCompleto(turno.paciente)}`, 30, yPosition + lineHeight);
      pdf.text(`Estado: ${turno.estado}`, 30, yPosition + 2* lineHeight);
      pdf.text(`Comentario: ${turno.comentario}`, 30, yPosition + 3 * lineHeight);
      pdf.text(`Reseña: ${turno.resenia}`, 30, yPosition + 4 * lineHeight);
      pdf.text(`Diagnóstico: ${turno.diagnostico}`, 30, yPosition + 5 * lineHeight);

      if (index < turnos.length - 1) {
        pdf.addPage();
      }

    });

    pdf.save('lista_turnos.pdf');

  }


  async descargarHistoriaPdf(turnos: Turno[]): Promise<void> {
    const pdf = new jspdf.jsPDF();
    const logoPath = '../../assets/logo.jpg';
    const logoDataUrl = await this.getBase64Image(logoPath);
    const lineHeight = 10;
    const linesPerPage = 10;

    turnos.forEach((turno, index) => {
      pdf.addImage(logoDataUrl, 'JPEG', 5, 5, 30, 30);
      pdf.text(`Antenciones de: ${this.getNombreCompleto(turno.especialista)}`, pdf.internal.pageSize.width / 2, 20, { align: 'center' });
      const fecha = new Date().toLocaleDateString();
      const fontSize = pdf.getFontSize();
      const fechaWidth = pdf.getStringUnitWidth(fecha) * fontSize / pdf.internal.scaleFactor;
      pdf.text(`${fecha}`, pdf.internal.pageSize.width - fechaWidth - 10, 20);
      const pageIndex = Math.floor(index / linesPerPage);
      const yPosition = 60 + (index % linesPerPage) * lineHeight + pageIndex * pdf.internal.pageSize.height;

      pdf.text(`${turno.dia} ${turno.fecha} ${turno.hora}`, 30, yPosition);
      pdf.text(`Paciente: ${this.getNombreCompleto(turno.paciente)}`, 30, yPosition + lineHeight);
      pdf.text(`Estado: ${turno.estado}`, 30, yPosition + 2* lineHeight);
      pdf.text(`Comentario: ${turno.comentario}`, 30, yPosition + 3 * lineHeight);
      pdf.text(`Reseña: ${turno.resenia}`, 30, yPosition + 4 * lineHeight);
      pdf.text(`Diagnóstico: ${turno.diagnostico}`, 30, yPosition + 5 * lineHeight);

      if (index < turnos.length - 1) {
        pdf.addPage();
      }

    });

    pdf.save('lista_turnos.pdf');

  }

  private async getBase64Image(imagePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = imagePath;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, img.width, img.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    });
  }

  private getNombreCompleto(persona: Paciente | Especialista): string {
    return `${persona.Apellido} ${persona.Nombre}`;
  }

}
