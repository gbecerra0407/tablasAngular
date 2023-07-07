import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columnas: string[] = ['nombre', 'desCorta', 'desLarga','etiquetas', 'carpeta', 'estado', 'fechaFirma', 'tipo', 'usuario', 'fecha', 'acciones'];

  datos: Documento[] = [
    new Documento('Carta compromiso', 'contrato', new Usuario('Guido', 'Becerra'), '4/7/2023', 'Firmado', '5/7/2023'),
    new Documento('Carta compromiso', 'contrato', new Usuario('Guido', 'Becerra'), '4/7/2023', 'Firmado', '5/7/2023', 'descripcion corta', 'd e s c r i p c i o n l a r g a', 'pasantes', ['buen','trabajo']),
    new Documento('Acuerdo confidenciabilidad', 'contrato', new Usuario('Juan', 'Becerra'), '4/7/2023'),
  ];

  articuloselect: Documento = new Documento('', '', new Usuario('',''), '');

  @ViewChild(MatTable) tabla1!: MatTable<Documento>;

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    this.datos.push(new Documento(this.articuloselect.nombre, this.articuloselect.tipo, this.articuloselect.usuario, this.articuloselect.fecha));
    this.tabla1.renderRows();
    this.articuloselect = new Documento('', '', new Usuario('',''), '');
  }
}



export class Usuario {
  constructor(public nombres: string, public apellido: string){

  }

  mostrarNombre(): string {
    return this.nombres+ ' ' +this.apellido;
  }
}

export class Documento {
  constructor(
    public nombre: string,
    public tipo: string,
    public usuario: Usuario = new Usuario('invitado',''),
    public fecha: string,
    public estado: string = 'No firmado',
    public fechaFirma: string = 'N/A',
    public desCorta: string = 'Sin descripcion',
    public desLarga: string = 'Sin descripcion',
    public carpeta: string = 'sin carpeta asignada',
    public etiquetas: string[] = ['Sin etiquetas'],
  ){}
}
