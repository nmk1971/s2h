import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {
  public accessForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accessForm=this.fb.group({
      code:['']
    })
  }

  onSubmit(): void{

  }

}
