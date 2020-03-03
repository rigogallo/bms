import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  canGenerateReport = false;

  constructor(private comSerive: CommunicationService,) { }

  ngOnInit() {
    this.comSerive.sectionsCompleted.subscribe(data => {
      this.canGenerateReport = data;
    });
    this.canGenerateReport = this.comSerive.getDataSession().sectionsCompleted; 
  }

  navigate(url) {    
    this.comSerive.navigate(url);
  }

  logout() {
    alert('Sesión finalizada')
  }

  getReport() {
    alert('Generando reporte....');
  }

}
