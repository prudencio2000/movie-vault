import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
/**
   * El número de la página actual en la paginación.
   * Se establece a 1 por defecto.
   */
@Input() currentPage: number = 1;

/**
 * El número total de páginas disponibles para la paginación.
 * Se establece a 1 por defecto.
 */
@Input() totalPages: number = 1;

/**
 * Emisor de eventos para notificar al componente padre sobre el cambio de página.
 */
@Output() pageChange = new EventEmitter<number>();

/**
 * Método para ir a la página anterior.
 * Emite el número de la página anterior si no es la primera página.
 */
previousPage(): void {
  if (this.currentPage > 1) {
    this.pageChange.emit(this.currentPage - 1);
  }
}

/**
 * Método para ir a la siguiente página.
 * Emite el número de la siguiente página si no es la última página.
 */
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.pageChange.emit(this.currentPage + 1);
  }
}

/**
 * Método para ir a una página específica.
 * Emite el número de la página si está dentro del rango válido.
 * @param page - El número de la página a la que se desea ir.
 */
goToPage(page: number): void {
  if (page > 0 && page <= this.totalPages) {
    this.pageChange.emit(page);
  }
}

/**
 * Método para obtener una lista de números de página a mostrar en la paginación.
 * Agrega elipsis (-1) si hay saltos en la numeración de las páginas.
 * @returns Un array de números de página y elipsis (-1) si es necesario.
 */
getPageNumbers(): number[] {
  const pages: number[] = [];
  const maxPagesToShow = 5; 

  if (this.totalPages <= maxPagesToShow) {
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
  } else {

    for (let i = 1; i <= 2; i++) {
      pages.push(i);
    }

    if (this.currentPage > 3) {
      pages.push(-1); 
    }


    for (let i = Math.max(this.currentPage - 1, 3); i <= Math.min(this.currentPage + 1, this.totalPages - 1); i++) {
      pages.push(i);
    }

    if (this.currentPage < this.totalPages - 2) {
      pages.push(-1); 
    }

    for (let i = Math.max(this.totalPages - 1, this.currentPage + 2); i <= this.totalPages; i++) {
      pages.push(i);
    }
  }

  return pages;
}
}
