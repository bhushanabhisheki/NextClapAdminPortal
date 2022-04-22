import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { remove } from 'lodash';
import { Subscription } from 'rxjs';

import { Question } from 'src/app/faq/question.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { FaqService } from './faq.service';
import { NewFaqDialog } from './new-faq/new-faq-dialog.component';
import { Answer } from './answer.model';

//TODO : need to move this to model while defining servicespots
interface ServiceSpots {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  questionList?: Question[];
  questionListSubscription?: Subscription;

  //TODO : to be fetched from the service spot API
  serviceSpots: ServiceSpots[] = [
    { value: 'Hotels', viewValue: 'Hotels' },
    { value: 'Picnic', viewValue: 'Picnic' },
    { value: 'Pizza Party', viewValue: 'Pizza Party' },
    { value: 'Catering', viewValue: 'Catering' },
  ];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public faqservice: FaqService,
    private confirmDialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.faqservice.getQueryList('1');
    this.questionListSubscription = this.faqservice.queryList.subscribe(
      (queryList) => {
        this.questionList = queryList;
        console.log(this.questionList);
      }
    );
  }

  getJSON(obj: any): any {
    {
      return JSON.stringify(obj);
    }
  }

  ngOnDestroy(): void {
    this.questionListSubscription?.unsubscribe();
  }

  openDialog(q = '', a = ''): void {
    const dialogRef = this.dialog.open(NewFaqDialog, {
      width: '48rem',
      height: '23rem',
      disableClose: false,
      data: null,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result)
    //     this.questionList?.push({
    //       id: Math.random().toString(36).substring(3, 15),
    //       question: result.question,
    //       answer: result.answer,
    //     });
    // });
  }

  onEditQuestion(question: Question) {
    const dialogRef = this.dialog.open(NewFaqDialog, {
      width: '48rem',
      height: '23rem',
      disableClose: false,
      data: question,
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     question.question = result.question;
    //     question.answer = result.answer;
    //   }
    // });
  }

  removeItemsWithID(items: Question[], id: string): void {
    remove(items, (x) => x.id === id);
  }

  deleteQuestion(question: Question) {
    this.confirmDialogService
      .confirmDialog({
        title: 'Delete Question',
        message: 'Are you sure you want to delete this question?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((response) => {
        if (this.questionList && response)
          this.removeItemsWithID(this.questionList, question.id);
      });
  }

  showSnackbarTopPosition(
    content: string,
    action: string | undefined,
    duration: any
  ) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  //functionality to read the contents of the CSV file
  //the schema of the uploaded file is defined in file-upload-dialog-component
  onImportCsvFile() {
    this.confirmDialogService
      .fileUploadDialog({
        title: 'Import Questions',
        message: 'Select the file to import questions :',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((response: any) => {
        let message = 'Invalid file or content not as per appropriate format.';
        try {
          if (response && response.data) {
            const responsedata = response.data;
            responsedata.forEach((record: any) => {
              let index = 1;
              let answersfromExcel = [];
              while (record['answer' + index]) {
                answersfromExcel.push(
                  new Answer(
                    Math.random().toString(36).substring(3, 15),
                    record['answer' + index]
                  )
                );
                index++;
              }

              this.questionList?.push({
                id: Math.random().toString(36).substring(3, 15),
                question: record.question,
                created_date: new Date().toString(),
                last_modified: new Date().toString(),
                answers: answersfromExcel,
                service: '1', //TODO : this needs to be based on service
              });
            });

            if (response && response.data.length > 0) {
              message = 'Questions added successfully !!!';
            }
          }
        } catch (e) {}

        this.showSnackbarTopPosition(message, 'Done', '1000');
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.questionList)
      moveItemInArray(
        this.questionList,
        event.previousIndex,
        event.currentIndex
      );

    console.log(this.questionList);
  }
}
