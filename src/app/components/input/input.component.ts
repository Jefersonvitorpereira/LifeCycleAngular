import { Item } from './../../interfaces/iItem';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() ItemQueVaiSerEditado!: Item;
  valorItem!: string;
  editando: boolean = false;
  textoBtn: string = 'Salvar item'

  constructor(private listaService: ListaDeCompraService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges){
    if(!changes['ItemQueVaiSerEditado'].firstChange){
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.ItemQueVaiSerEditado?.nome;
    }
  }

  adicionarItem() {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  limparCampo() {
    this.valorItem = '';
  }

  editarItem(){
    this.listaService.editarItemDaLista(this.ItemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = "Salvar item"
  }
}
