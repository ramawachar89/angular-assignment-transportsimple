import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public forms: FormGroup;
  public detailsJourney: data[] = [];
  public title = 'trip-assignment';

  constructor(public formBuilder: FormBuilder) {
    this.forms = this.formBuilder.group({
      startName: ['', [Validators.required, Validators.minLength(3)]],
      endName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.forms = this.formBuilder.group({
      startName: ['', [Validators.required, Validators.minLength(3)]],
      endName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  submitForm() {
    let start = this.forms?.get('startName')?.value;
    let end = this.forms?.get('endName')?.value;
    let isArrowLine = false;
    let isSameDropPickTerm = false;
    if (this.forms?.status !== 'INVALID') {
      let lastTrip = this.detailsJourney[this.detailsJourney.length - 1];
      let lastTripIndex = this.detailsJourney.length - 1;
      console.log('lastTrip', lastTripIndex);

      if (lastTrip?.end !== start) {
        isArrowLine = true;
      }

      if (start === lastTrip?.start && end === lastTrip?.end) {
        isArrowLine = false;
        isSameDropPickTerm = true;
        this.detailsJourney.forEach((trip, index) => {
          if (index === lastTripIndex) {
            trip.isSameDropPickTerm = true;
          }
        });
      }
      let data = {
        start: this.forms?.get('startName')?.value,
        end: this.forms?.get('endName')?.value,
        id: Math.floor(Math.random() * 100),
        isArrowLineContinued: isArrowLine,
        isSameDropPickTerm: isSameDropPickTerm,
      };

      this.detailsJourney?.push(data);
      this.forms?.reset({
        startName: '',
        endName: '',
      });
      console.log('this.detailsJourney', this.detailsJourney);
    }
  }
}

interface data {
  start: string;
  end: string;
  isArrowLineContinued: boolean;
  isSameDropPickTerm: boolean;
}
