import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/communication.service';
import { User } from '../../models/user.model';
import { UserServiceService } from '../user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  showNew = false;
  user: User = new User();
  modalReference: any;
  users: User[] = [];
  isLoading = true;

  constructor(
    private UserService: UserServiceService,
    private communicationService: CommunicationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.UserService.getAllUsers().pipe(finalize(() => this.isLoading = false)).subscribe(res => {
      this.users = res
    });
  }

  showNewUser() {
    this.showNew = true;
  }

  createNew() {    
    this.UserService.createNewUSer(this.user.email, this.user.password).subscribe(userResponse => {      
      this.user.uid = userResponse.localId;
      this.UserService.saveNewUser(this.user).then(data => {        
      }).finally(() => {
        this.modalReference.close();
        this.loadUsers()
      })
    }
    )
  }

  openDeleteUserModal(user: User, modalID) {
    this.user = { ...user }
    this.openAnyModal(modalID)

  }

  deleteUserFunc(user: User) {
    this.UserService.deleteUserAccount(user).subscribe(data => {
      console.log(data)
      if (data.kind == "identitytoolkit#DeleteAccountResponse") {
        this.UserService.deleteUserFromDB(user).then(deleted => {
          console.log('Deleted from DB')
        }).finally(() => this.loadUsers());
      }
    });

  }

  openNewUserModal(content) {
    // this.modalService.open(content, { centered: true });
    this.openAnyModal(content);
  }

  openAnyModal(modalId) {
    this.modalReference = this.modalService
      .open(modalId, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      });
  }

  closeForm() {
    this.user = new User();
    this.modalReference.close();
  }

}
