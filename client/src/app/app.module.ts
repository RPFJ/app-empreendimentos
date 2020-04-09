//Bibliotecas
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import * as _ from 'lodash';

// Componentes do login
import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'

// Services do Login
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { RequestService } from './service/request.service'

// Componentes das Cooperativas
import { TipoContatoComponent} from './cooperativa/tipoContato/tipoContato.component'
import { LocalizacaoComponent} from './cooperativa/localizacao/localizacao.component'
import { FormacaoColetivaComponent } from './cooperativa/formacaoColetiva/formacaoColetiva.component'
import { AtividadeCooperativaComponent} from './cooperativa/atividadeCooperativa/atividadeCooperativa.component'
import { AreaAtuacaoComponent } from './cooperativa/areaAtuacao/areaAtuacao.component'
import { TipoOrganizacaoComponent } from './cooperativa/tipoOrganizacao/tipoOrganizacao.component'
import { CooperativaComponent } from './cooperativa/cooperativa/cooperativa.component'
import { ContatoComponent} from './cooperativa/contato/contato.component'

// Componentes da Evolucao
import { OpcaoQuestaoComponent} from './evolucao/opcaoQuestao/opcaoQuestao.component'
import { QuestaoComponent} from './evolucao/questao/questao.component'

// Componentes da Rede Produtiva
import { TipoRedeComponent} from './redeProdutiva/tipoRede/tipoRede.component'
import { ApoaidorComponent } from './redeProdutiva/apoiador/apoiador.component'
import { RedeProdutivaComponent } from './redeProdutiva/redeProdutiva/redeProdutiva.component'
import { EvolucaoComponent } from './evolucao/evolucao/evolucao.component'

const routes: Routes = [
  // rotas do login
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
   path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // Rotas da Cooperativa
  { path: 'tipoContato', component: TipoContatoComponent},
  { path: 'localizacao', component: LocalizacaoComponent},
  { path: 'formacaoColetiva', component: FormacaoColetivaComponent},
  { path: 'atividadeCooperativa', component: AtividadeCooperativaComponent},
  { path: 'areaAtuacao', component: AreaAtuacaoComponent},
  { path: 'tipoOrganizacao', component: TipoOrganizacaoComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'cooperativa', component: CooperativaComponent},
  // Rotas da Evolucao
  { path: 'questao', component: QuestaoComponent},
  { path: 'opcaoQuestao', component: OpcaoQuestaoComponent},
  { path: 'evolucao', component: EvolucaoComponent},
  // Rotas da Rede Produtiva,
  { path: 'apoiador', component: ApoaidorComponent},
  { path: 'tipoRede', component: TipoRedeComponent},
  { path: 'redeProdutiva', component: RedeProdutivaComponent}
]

@NgModule({
  declarations: [
    //Login
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    // Cooperativa
    TipoContatoComponent,
    LocalizacaoComponent,
    FormacaoColetivaComponent,
    AtividadeCooperativaComponent,
    AreaAtuacaoComponent,
    TipoOrganizacaoComponent, 
    ContatoComponent,
    CooperativaComponent,
    // Evolução
    QuestaoComponent,
    OpcaoQuestaoComponent,
    EvolucaoComponent,
    // Rede Produtiva
    TipoRedeComponent,
    ApoaidorComponent,
    RedeProdutivaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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