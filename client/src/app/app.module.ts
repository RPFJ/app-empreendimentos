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

// Componentes das Empreendimentos
import { TipoContatoComponent} from './empreendimento/tipoContato/tipoContato.component'
import { LocalizacaoComponent} from './empreendimento/localizacao/localizacao.component'
import { FormacaoColetivaComponent } from './empreendimento/formacaoColetiva/formacaoColetiva.component'
import { AtividadeEmpreendimentoComponent} from './empreendimento/atividadeEmpreendimento/atividadeEmpreendimento.component'
import { AreaAtuacaoComponent } from './empreendimento/areaAtuacao/areaAtuacao.component'
import { TipoOrganizacaoComponent } from './empreendimento/tipoOrganizacao/tipoOrganizacao.component'
import { EmpreendimentoComponent } from './empreendimento/empreendimento/empreendimento.component'
import { ContatoComponent} from './empreendimento/contato/contato.component'

// Componentes da Evolucao
import { OpcaoQuestaoComponent} from './evolucao/opcaoQuestao/opcaoQuestao.component'
import { QuestaoComponent} from './evolucao/questao/questao.component'
import { EvolucaoComponent } from './evolucao/evolucao/evolucao.component'
import { GeracaoRendaComponent} from './evolucao/geracaoRenda/geracaoRenda.component'

// Componentes da Rede Economica
import { TipoRedeComponent} from './redeEconomica/tipoRede/tipoRede.component'
import { ApoaidorComponent } from './redeEconomica/apoiador/apoiador.component'
import { RedeEconomicaComponent } from './redeEconomica/redeEconomica/redeEconomica.component'
import { FormularioComponent } from './evolucao/multiStepForm/formulario.componet'
import { MultiStepFormComponent } from './evolucao/multiStepForm/multi-step-form.component'
import { FormatTitlePipe } from './pipes/format-title.pipe'

const routes: Routes = [
  // rotas do login
  { path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  {
   path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // Rotas da Empreendimento
  { path: 'tipoContato', component: TipoContatoComponent},
  { path: 'localizacao', component: LocalizacaoComponent},
  { path: 'formacaoColetiva', component: FormacaoColetivaComponent},
  { path: 'atividadeEmpreendimento', component: AtividadeEmpreendimentoComponent},
  { path: 'areaAtuacao', component: AreaAtuacaoComponent},
  { path: 'tipoOrganizacao', component: TipoOrganizacaoComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'empreendimento', component: EmpreendimentoComponent},
  // Rotas da Evolucao
  { path: 'questao', component: QuestaoComponent},
  { path: 'opcaoQuestao', component: OpcaoQuestaoComponent},
  { path: 'evolucao', component: EvolucaoComponent},
  { path: 'geracaoRenda', component: GeracaoRendaComponent},
  { path: 'formulario', component: FormularioComponent},
  { path: 'MultiStepFormComponent', component: MultiStepFormComponent},
  { path: 'FormatTitlePipe', component: FormatTitlePipe},
  
  // Rotas da Rede Economica,
  { path: 'apoiador', component: ApoaidorComponent},
  { path: 'tipoRede', component: TipoRedeComponent},
  { path: 'redeEconomica', component: RedeEconomicaComponent}
]

@NgModule({
  declarations: [
    //Login
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    // Empreendimento
    TipoContatoComponent,
    LocalizacaoComponent,
    FormacaoColetivaComponent,
    AtividadeEmpreendimentoComponent,
    AreaAtuacaoComponent,
    TipoOrganizacaoComponent, 
    ContatoComponent,
    EmpreendimentoComponent,
    // Evolução
    QuestaoComponent,
    OpcaoQuestaoComponent,
    EvolucaoComponent,
    GeracaoRendaComponent, 

    FormatTitlePipe,
    MultiStepFormComponent,
    FormularioComponent, 
    // Rede Economica
    TipoRedeComponent,
    ApoaidorComponent,
    RedeEconomicaComponent
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