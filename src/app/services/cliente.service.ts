import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private htpp: HttpClient) { }

  findbyId(id: any): Observable<Cliente> {
    return this.htpp.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`) 
  }

  findAll(): Observable<Cliente[]> {
    return this.htpp.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.htpp.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    //cliente.perfis = ["1"];
    console.log("cliente..................... ", cliente);
    return this.htpp.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<Cliente> {
    return this.htpp.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
