import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import { CommunicationService } from '../../communication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formData: any;

  selectedSection: any;
  mainForm: any;  
  aceptUseConditions = false;
  // createdForm = false;

  constructor(private comSerive: CommunicationService,
    private router: Router,
    private db: AngularFirestore) { }


  ngOnInit() {    
    this.mainForm = this.comSerive.getDataSession();   
    this.aceptUseConditions = this.mainForm.aceptUseConditions;     
    //this.comSerive.parameterSelected.emit({ parameter: this.sections[0].parameters[0], selectedSection: this.sections[0] });

  
  } 

  userAceptUseConditions(){ 
    this.aceptUseConditions = !this.aceptUseConditions;
    this.mainForm.aceptUseConditions = this.aceptUseConditions;
    this.mainForm.emailUsuario = this.comSerive.getUserSession()           
  }

  save() {
    this.mainForm.createdForm = true;
    this.db.collection('informes').add(this.mainForm).then( data => {
      this.mainForm.idForm = data.id;
      this.comSerive.saveDataSession(this.mainForm);      
      this.comSerive.saveFormData();      
    }).catch(err => {
      console.log('Ocurrió un error: ', err);
    })    
  }

  goSections() {    
    this.comSerive.saveDataSession(this.mainForm);
    this.comSerive.saveFormData();
    this.comSerive.navigate('parametros');
  }

}
