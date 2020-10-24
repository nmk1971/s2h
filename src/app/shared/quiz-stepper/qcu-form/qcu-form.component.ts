import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-qcu-form',
  templateUrl: './qcu-form.component.html',
  styleUrls: ['./qcu-form.component.scss']
})
export class QcuFormComponent implements OnInit,OnDestroy {
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
