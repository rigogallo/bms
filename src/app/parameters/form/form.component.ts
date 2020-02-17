import { Component, OnInit, Input } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import { CommunicationService } from '../../communication.service';
import { Router } from '@angular/router';

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

  constructor(private comSerive: CommunicationService,
    private router: Router,) { }

  ngOnInit() {    
    this.mainForm = this.comSerive.getDataSession();   
    this.aceptUseConditions = this.mainForm.aceptUseConditions;     
    //this.comSerive.parameterSelected.emit({ parameter: this.sections[0].parameters[0], selectedSection: this.sections[0] });
  } 

  userAceptUseConditions(){
    this.aceptUseConditions = !this.aceptUseConditions;
    this.mainForm.aceptUseConditions = this.aceptUseConditions;
    this.comSerive.saveDataSession(this.mainForm);
  }

  goSections() {    
    this.comSerive.saveDataSession(this.mainForm);
    this.router.navigateByUrl('/sections');
  }

}
