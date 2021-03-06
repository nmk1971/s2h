import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from '../../session.service';
import {getRoute} from '../../../shared/helpers/question-navigation';
@Component({
  selector: 'app-qcu-form',
  templateUrl: './qcu-form.component.html',
  styleUrls: ['./qcu-form.component.scss']
})
export class QcuFormComponent implements OnInit, OnDestroy {
  public currentQuestion: any = null;
  private questionId = null;
  private subscription: Subscription;
  public session: any = null;


  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.session = this.sessionService.sessionResponseValue;
    this.subscription = this.route.params.subscribe(p => {
      this.questionId = p.qid;
      this.currentQuestion = this.session.idquiz.questions.filter(quest => quest._id === this.questionId)[0];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  radioChecked(index): void {
    for (let i = 0; i < this.currentQuestion.qcxResponse.length; i++) {
      if (i !== index) {
        this.currentQuestion.qcxResponse[i].isValid = false;
      } else {
        this.currentQuestion.qcxResponse[i].isValid = true;
      }
    }
  }

  nextPage(): void {
    this.saveQuestion(this.currentQuestion);
    this.router.navigate([getRoute(this.currentQuestion, 'next')]);
  }

  previousPage(): void {
    this.saveQuestion(this.currentQuestion);
    this.router.navigate([getRoute(this.currentQuestion, 'previous')]);
  }


  endResponseSession(): void {
    this.saveQuestion(this.currentQuestion);
    console.log(this.session);
    this.router.navigate(['/finalresult']);
  }

  saveQuestion(quest): void{
    this.session.idquiz.questions = this.session.idquiz.questions.map(q => {
      return (q._id === quest._id) ? (quest) : q;
      });
    this.sessionService.notify(this.session);
    }

    getCurrentIndex(): number{
      return this.session.idquiz.questions.findIndex(elm => elm._id === this.currentQuestion._id) + 1;

    }
}
