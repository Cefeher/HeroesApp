import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { tap } from 'rxjs';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles:[`

  `]
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  hayError: boolean = false;



  constructor(private heroesService: HeroesService) { }


  buscando() {

    this.heroesService.getSugerencias(this.termino.trim()).pipe(tap(console.log)
    ).subscribe(heroes => this.heroes = heroes);

  }



  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero

    this.heroesService.getHeroePorId(heroe.id!).subscribe((heroes) => {
      this.heroeSeleccionado = heroes
    }, (err) => {
      this.hayError = true;
      this.heroes = [];
    });
  }

}
