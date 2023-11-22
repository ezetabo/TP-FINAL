import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { UsuarioGral } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  async guardarComoExcel(usuario: UsuarioGral): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuario');

    const columns = [
      { header: 'Nombre', key: 'nombre', width: 15 },
      { header: 'Apellido', key: 'apellido', width: 15 },
      { header: 'Dni', key: 'dni', width: 15 },
      { header: 'Edad', key: 'edad', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Rol', key: 'rol', width: 15 },
    ];

    if (usuario.Rol === 'especialista') {
      columns.push({ header: 'Especialidades', key: 'especialidades', width: 30 });
    } else if (usuario.Rol === 'paciente') {
      columns.push({ header: 'Obra Social', key: 'obraSocial', width: 30 });
    }

    worksheet.columns = columns;

    const rowData: any = {
      nombre: usuario.Nombre,
      apellido: usuario.Apellido,
      dni: usuario.Dni,
      edad: usuario.Edad,
      email: usuario.Email,
      rol: usuario.Rol
    };


    if (usuario.Rol === 'especialista') {
      rowData.especialidades = usuario.Especialidades.join(', ');
    } else if (usuario.Rol === 'paciente') {
      rowData.obraSocial = usuario.ObraSocial;
    }

    worksheet.addRow(rowData);
    if (usuario.Rol === 'especialista') {
      worksheet.getColumn('especialidades').alignment = { wrapText: true };
    }
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' },
      };
      cell.font = {
        color: { argb: 'FFFFFF' },
        bold: true,
      };
    });

    worksheet.getRow(2).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00ffff' }
      };
      cell.font = {
        color: { argb: '000000' },
        bold: true,
      };
    });

    const blob = await workbook.xlsx.writeBuffer();
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    link.download = `${usuario.Apellido}_${usuario.Nombre}_${usuario.id}.xlsx`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
