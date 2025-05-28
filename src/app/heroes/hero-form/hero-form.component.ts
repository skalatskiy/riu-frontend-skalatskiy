import { HeroesService } from './../services/heroes.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {v4 as uuid} from 'uuid';
import { Hero } from '../schemas/hero.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const defaultImageUrl = "https://www.shutterstock.com/image-vector/generic-superhero-figure-standing-proud-260nw-303136100.jpg";

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {

  heroForm!: FormGroup;

  private heroesService: HeroesService = inject(HeroesService);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    if(this.heroForm.valid) {
      const name = this.heroForm.get('name')?.value;
      const superpower = this.heroForm.get('superpower')?.value;
      const imageUrl = this.heroForm.get('imageUrl')?.value;
      const description = this.heroForm.get('description')?.value;
      const alive = this.heroForm.get('alive')?.value;

      const newHero: Hero = {
        id: uuid(),
        name, 
        superpower,
        imageUrl: imageUrl || defaultImageUrl,
        description,
        alive
      } 
     

      this.heroesService.createNewHero(newHero).subscribe({
        next: (success) => {
          if (success) {
            this.dialog.closeAll();
          } else {
            throw new Error('Something went wrong creating a new hero');
          }
        },
      }
      );

    }
  }

  onCancel() {
    this.dialog.closeAll();
  }

  private initForm() {
    this.heroForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
      superpower: new FormControl('', [Validators.minLength(2), Validators.required]),
      description: new FormControl(),
      imageUrl: new FormControl(),
      alive: new FormControl(true),
    });
  }
}
