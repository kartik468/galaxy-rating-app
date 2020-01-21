import { Component, OnInit } from '@angular/core';
import { GalaxyService } from './galaxy.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'gr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'galaxy-rating-app';
  galaxies = [];
  galaxyForm: FormGroup;

  constructor(private galaxyService: GalaxyService) {}
  ngOnInit() {
    this.galaxyService.getGalaxies().subscribe(res => {
      this.galaxies = res;
    });
    this.createForm();
    this.onFormChanges();
  }

  createForm() {
    this.galaxyForm = new FormGroup({
      galaxy: new FormControl({ value: 2, disabled: false }, [
        Validators.required
      ]),
      rating: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      name: new FormControl({ value: null, disabled: false }, [
        Validators.required
      ])
    });
  }

  onFormChanges() {
    const galaxyControl = this.galaxyForm.get('galaxy');
    const ratingControl = this.galaxyForm.get('rating');
    // this.galaxyForm.get('galaxy').valueChanges.subscribe(val => {
    //   if (val) {
    //     ratingControl.enable();
    //   } else {
    //     ratingControl.setValue(null);
    //     ratingControl.disable();
    //   }
    // });

    ratingControl.valueChanges.subscribe(val => {
      console.log('ratingControl value change', val);
    });

    galaxyControl.valueChanges.subscribe(val => {
      console.log('galaxyControl value change', val);
    });
    galaxyControl.setValue(3);

    // ratingControl.
  }

  onSubmit() {
    console.log(this.galaxyForm.value);
  }
}
