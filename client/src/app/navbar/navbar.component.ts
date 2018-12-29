import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../app.state";
import {select, Store} from "@ngrx/store";
import {TodoCreateRequested} from "../todo/todo.actions";
import {TodoHelperService} from "../services/todo-helper.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {
  selectTodoControlsAreActive,
  selectTodoCreateModalOpen,
  selectTodoModalIsModify,
  selectTodoModalModifyTodo
} from "../common/state/layout/layout.selectors";
import {filter, map} from "rxjs/operators";
import {CloseCreateTodoModal, OpenCreateTodoModal} from "../common/state/layout/layout.actions";
import {Todo} from "../todo/model/todo";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @ViewChild("content") _templateModal: ElementRef;

  public readonly CREATE_TODO_CLICK_NAME = "CREATE_TODO_BUTTON";
  public readonly CANCEL_CLICK_NAME = "CANCEL_CLICK_BUTTON";
  public readonly CROSS_CLICK_NAME = "CROSS_CLICK_BUTTON";

  newTodoForm : FormGroup;
  isNavbarCollapsed=true;
  todoControlsAreActive$;
  todoCreateModalIsOpenSubscription : Subscription;
  todoModalIsModify$ : Observable<Boolean>;
  modifyModalTodoSubscription : Subscription;

  ngOnInit() {
    this.initForm();
    this.todoControlsAreActive$ = this.store.pipe(select(selectTodoControlsAreActive));
    this.todoModalIsModify$ = this.store.pipe(select(selectTodoModalIsModify));
    this.modifyModalTodoSubscription = this.store.pipe(
      select(selectTodoModalModifyTodo),
      filter((todo : Todo) => todo!= null),
      map((todo : Todo) => {
        this.setFormFields(todo);
      })).subscribe();
    this.todoCreateModalIsOpenSubscription = this.store.pipe(select(selectTodoCreateModalOpen),filter(value => value)).pipe(map( value => {
        console.log("CALLED");
        if(value){
          return this.open();
        }
      } )
    ).subscribe();
  }

  constructor(private store : Store<AppState>, private todoHelperService : TodoHelperService, private modalService : NgbModal) { }


  public onCreateNewTodo(){
    console.log("Create new pressed!",this.newTodoForm.value);
    let title : string = this.newTodoForm.value.todoTitle;
    let description : string = this.newTodoForm.value.todoDescription;
    this.store.dispatch(new TodoCreateRequested({todo : this.todoHelperService.generateTodoFromTitleAndDescription(title,description)}));
  }

  private initForm() {
    let todoTitle = '';
    let todoDescription = '';
    this.newTodoForm = new FormGroup({
      'todoTitle': new FormControl(todoTitle, [Validators.required, Validators.maxLength(40)]),
      'todoDescription': new FormControl(todoDescription, [Validators.required, Validators.maxLength(250)]),
    });
  }

  openCreateTodoModal(){
    this.store.dispatch(new OpenCreateTodoModal());
  }

  open() {
    return this.modalService.open(this._templateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result && result === this.CREATE_TODO_CLICK_NAME){
        this.onCreateNewTodo();
      }
      this.resetFormFields();
      this.store.dispatch(new CloseCreateTodoModal());
    }, () => {
      this.resetFormFields();
      this.store.dispatch(new CloseCreateTodoModal());
    });
  }

  private resetFormFields(){
    this.newTodoForm.patchValue({['todoTitle']:""});
    this.newTodoForm.patchValue({['todoDescription']:""});
  }
  private setFormFields(todo : Todo){
    this.newTodoForm.patchValue({['todoTitle']:todo.title});
    this.newTodoForm.patchValue({['todoDescription']:todo.description});
  }

  ngOnDestroy(){
    console.log("ONDESTROY")
    this.todoCreateModalIsOpenSubscription.unsubscribe();
    this.modifyModalTodoSubscription.unsubscribe();
  }
}
