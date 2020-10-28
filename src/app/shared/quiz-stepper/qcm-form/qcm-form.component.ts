import { Subscription } from 'rxjs';
import { SessionService } from './../../session.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qcm-form',
  templateUrl: './qcm-form.component.html',
  styleUrls: ['./qcm-form.component.scss']
})
export class QcmFormComponent implements OnInit, OnDestroy {
  public currentQuestion: any;
  private questionId;
  private subscription: Subscription;
  public i = 0;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const session = this.sessionService.sessionResponseValue;
    this.subscription = this.route.params.subscribe(p => {
      this.questionId = p.qid;
      this.currentQuestion = session.idquiz.questions.filter(quest => quest._id === this.questionId)[0];
      this.currentQuestion.qcxResponse.map(r => {
        r.isValid = false;
      });
      // tslint:disable-next-line: prefer-for-of
      /*    let i;
          for (i = 0; i < session.idquiz.questions.length; i++) {
            if (this.currentQuestion._id === session.idquiz.questions[i]._id) {
              break;
            }
          }
          this.currentQuestion.previous = null;
          this.currentQuestion.next = null;
          if (i > 0) {
            this.currentQuestion.previous = session.idquiz.questions[i - 1]._id;
          }
          if (i < session.idquiz.questions.length - 1) {
            this.currentQuestion.next = session.idquiz.questions[i + 1]._id;
          }*/
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aff(msg): void {
    this.i = this.i + 1;
    console.log(msg);
  }
  nextPage(): void {
    console.log(`/qcm/${this.currentQuestion.next}`);
    switch (this.currentQuestion.nextQuestionType) {
      case 'QCM': { this.router.navigate([`/response/qcm/${this.currentQuestion.next}`]); break; }
      case 'QCU': { this.router.navigate([`/response/qcu/${this.currentQuestion.next}`]); break; }
      case 'INPUT': { this.router.navigate(['app-input']); break; }
      case 'ORDERING': { this.router.navigate(['app-ordering']); break; }
    }
  }

  previousPage(): void {
    console.log(`/qcm/${this.currentQuestion.previous}`);
    switch (this.currentQuestion.previousQuestionType) {
      case 'QCM': { this.router.navigate([`/response/qcm/${this.currentQuestion.previous}`]); break; }
      case 'QCU': { this.router.navigate([`/response/qcu/${this.currentQuestion.previous}`]); break; }
      case 'INPUT': { this.router.navigate(['app-input']); break; }
      case 'ORDERING': { this.router.navigate(['app-ordering']); break; }
    }

  }
}
