import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements /* AfterViewInit,*/ OnInit {
  public person = null;

  constructor(public ds: DataService) {
    this.ds.nacitajConfigTabulky().subscribe(data => (this.tabulka = data));
    this.ds.nacitajData().subscribe(data => (this.data = data));
    this.ds.nacitajConfigFormulara().subscribe(form => {
      this.person = form;
    });
  }

  data;
  tabulka;

  ngOnInit() {}

  ukladam(value) {
    const temp = [];
    const novePole = Object.entries(value);
    novePole.forEach(val => {
      temp.push({ id: val[0], hodnota: val[1] });
    });
    this.data.push(temp);
    console.log(this.data);
  }

  submit(value: { [name: string]: any }) {
    const temp = [];
    const novePole = Object.entries(value);
    novePole.forEach(val => {
      temp.push({ id: val[0], hodnota: val[1] });
    });
    this.data.push(temp);
  }
}
