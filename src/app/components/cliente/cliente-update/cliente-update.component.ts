import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  senha: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cbAdmin: FormControl = new FormControl(null);
  cbClient: FormControl = new FormControl(null);
  cbTec: FormControl = new FormControl(null);

  // 3322-9270
  // adm@lladministracoes.com.br
  // isabele
  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(){
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha;
  }

  findById(): void {
    this.service.findbyId(this.cliente.id).subscribe(resposta => {
      //resposta.perfis = [];
      this.cliente = resposta;
      for(let p of this.cliente.perfis){
        if( p == "TECNICO")
          this.cbTec.setValue(true);
        if( p == "ADMIN")
          this.cbAdmin.setValue(true);
        if( p == "CLIENTE")
          this.cbClient.setValue(true);
      }
    });
  }

  update() {
    this.cliente.perfis = [];
    if(this.cbAdmin.value)  this.cliente.perfis.push("0");
    if(this.cbClient.value) this.cliente.perfis.push("1");
    if(this.cbTec.value)    this.cliente.perfis.push("2");
    this.service.update(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente atualizado com sucesso.', 'Update')
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  
  }

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

}
