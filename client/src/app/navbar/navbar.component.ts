import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";
import {TodoCreateRequested} from "../todo/todo.actions";
import {TodoHelperService} from "../services/todo-helper.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public readonly CREATE_TODO_CLICK_NAME = "CREATE_TODO_BUTTON";
  public readonly CANCEL_CLICK_NAME = "CANCEL_CLICK_BUTTON";
  public readonly CROSS_CLICK_NAME = "CROSS_CLICK_BUTTON";

  closeResult: string;
  newTodoForm : FormGroup;

  constructor(private store : Store<AppState>, private todoHelperService : TodoHelperService, private modalService : NgbModal) { }

  ngOnInit() {
    this.initForm();
  }

  public onCreateNewTodo(){
    console.log("Create new pressed!",this.newTodoForm.value);
    let title : string = this.newTodoForm.value.todoTitle;
    let description : string = this.newTodoForm.value.todoDescription;

    this.store.dispatch(new TodoCreateRequested({todo : this.todoHelperService.generateTodoFromTitleAndDescription(title,description)}));
    console.log(this.newTodoForm);

  }

  private initForm() {
    let todoTitle = '';
    let todoDescription = '';


    this.newTodoForm = new FormGroup({
      'todoTitle': new FormControl(todoTitle, Validators.required),
      'todoDescription': new FormControl(todoDescription, Validators.required),
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Here1 ",this.closeResult);
      if(result && result === this.CREATE_TODO_CLICK_NAME){
        this.onCreateNewTodo();
        this.newTodoForm.patchValue({['todoTitle']:""});
        this.newTodoForm.patchValue({['todoDescription']:""});
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Here2 ",this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
