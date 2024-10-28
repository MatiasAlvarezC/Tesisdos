import { CommonModule } from '@angular/common'; //ngif ngfor
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';  //para navegar entre componentes
import { UsersService } from '../../services/users.service';  //logica
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Importa el módulo de íconos

@Component({  //decorador que define el componente
  selector: 'app-gestion-socios', //etiqueta html con el que se usa el componente
  standalone: true,  //cada comoponente es independiente y no pertenece a un modulo
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    FooterComponent,
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './gestion-socios.component.html',
  styleUrls: ['./gestion-socios.component.css'] 
})
export class GestionSociosComponent implements OnInit {  //Oninit ejecuta la logica al inicializarse
  
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellido', 'Email', 'FechaDeNacimiento', 'Dni'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private usersService: UsersService) { //cosntrusctor que inyecta el servicio
    this.dataSource = new MatTableDataSource<User>([]); // Inicializamos la tabla vacía
  }

  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: User[] = await this.usersService.obtenerDatos();
      this.dataSource = new MatTableDataSource<User>(data); // Pasa los datos a la tabla
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  ngAfterViewInit(): void {
    // Conecta el paginador a la tabla después de que la vista ha sido inicializada
    this.dataSource.paginator = this.paginator;
  }

  // Método para aplicar un filtro en la tabla
  aplicarFiltro(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }

  // Método para manejar la acción de agregar un nuevo socio
  onAddSocio() {
    // Aquí puedes abrir un formulario para agregar un nuevo socio
    console.log('Agregar nuevo socio');
    // Puedes navegar a un componente de formulario o abrir un diálogo modal
    // Ejemplo de navegación:
    // this.router.navigate(['/ruta-del-formulario']);
  }
}