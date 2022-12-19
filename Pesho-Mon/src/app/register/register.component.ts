import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import Trainer from '../trainer';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
    ]
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    email: string;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
    }

    cancelChanges(event: Event) {
        event.preventDefault();
        this.router.navigate(['/pokemons']);
    }

    async onSubmit() {
        await this.authService.register(this.username, this.password, this.email);

        this.authService.login(this.username, this.password)
            .subscribe((isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    this.router.navigate(['/pokemons']);
                } else {
                    this.username = '';
                    this.password = '';
                    this.email = '';
                    this.router.navigate(['/register']);
                }
            });
        // if (this.isAddForm) {
        //     const peshomon = this.peshomonService.findPeshomonByName(this.peshomon.name);

        //     if (peshomon) {
        //         return alert(`Peshomon with given name "${this.peshomon.name}" already exists !`);
        //     }

        //     // back-end will create new id value and pass on to this.router
        //     this.peshomonService.addPeshomon(this.peshomon)
        //         .subscribe((peshomon: Pokemon) => this.router.navigate(['/pokemon', peshomon.id]));
        // } else {
        //     this.peshomonService.updatePeshomon(this.peshomon)
        //         .subscribe(() => this.router.navigate(['/pokemon', this.peshomon.id]));
        // }
    }
}
