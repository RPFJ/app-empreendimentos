import {Component} from '@angular/core'
import {AuthenticationService, UsuarioDetails} from "../authentication.service";

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    details: UsuarioDetails

    constructor(private auth: AuthenticationService){}

    ngOnInit() {
        this.auth.profile().subscribe(
            usuario => {
                this.details = usuario
            },
            err => {
                console.error(err)
            }
        )
    }
}