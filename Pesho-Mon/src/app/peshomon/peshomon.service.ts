import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import Pokemon from './pokemon';
import POKEMONS from './pokemonList';

@Injectable()
export default class PeshomonService {

    constructor(private httpClient: HttpClient) { }

    getPeshomonById(peshomonId: number): Pokemon | undefined {
        // return POKEMONS.find((pok) => pok.id === peshomonId);
        return POKEMONS.find((pok) => pok.id === peshomonId);
    }

    // getPeshomonList(): Pokemon[] { return POKEMONS; }
    getPeshomonList(): Observable<Pokemon[]> {
        // HttpClient can works with data stream that can be typed, in this scenario
        // employing Angular-In-Memory to simulate a server response
        return this.httpClient.get<Pokemon[]>('api/pokemons')
            .pipe(
                tap((peshomonList) => console.table(peshomonList),), // logs response
                catchError((error) => {
                    // if error occurs, logs error + return Observable in order for app to
                    // keep functioning
                    console.log(error);
                    return of([]);
                }),
            );
    }

    getPeshomonTypeList(): string[] {
        return [
            'Combat',
            'Electric',
            'Fairy',
            'Fire',
            'Flying',
            'Insect',
            'Normal',
            'Plant',
            'Poison',
            'Psy',
            'Water',
        ];
    }
}
