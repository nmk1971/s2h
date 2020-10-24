import { Subscription } from 'rxjs';
import { SessionService } from './../../session.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qcm-form',
  templateUrl: './qcm-form.component.html',
  styleUrls: ['./qcm-form.component.scss']
})
export class QcmFormComponent implements OnInit,OnDestroy {
  public currentQuestion: any;
  private questionId;
  private subscription: Subscription;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const session = this.sessionService.sessionResponseValue;
    this.subscription = this.route.params.subscribe(p => this.questionId = p.qid);
    this.currentQuestion = session.idquiz.questions.filter(quest => quest._id === this.questionId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
