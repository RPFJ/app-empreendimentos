import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { TipoContatoComponent} from './cooperativa/tipoContato/tipoContato.component'
import { LocalizacaoComponent} from './cooperativa/localizacao/localizacao.component'

import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { RequestService } from './service/request.service'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
   path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'tipoContato', component: TipoContatoComponent},
  { path: 'localizacao', component: LocalizacaoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TipoContatoComponent,
    LocalizacaoComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, 
    AuthGuardService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}