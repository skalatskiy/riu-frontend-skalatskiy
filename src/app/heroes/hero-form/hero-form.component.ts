import { HeroesService } from './../services/heroes.service';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {v4 as uuid} from 'uuid';
import { Hero } from '../schemas/hero.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const defaultImageUrl = "https://www.shutterstock.com/image-vector/generic-superhero-figure-standing-proud-260nw-303136100.jpg";

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
  heroForm!: FormGroup;
  isEdit: boolean = false;

  private heroesService: HeroesService = inject(HeroesService);

  constructor(
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  ngOnInit() {
    this.initForm();

    if(this.data) {
      this.isEdit = true;
      this.fillInitialFormData();
    }
  }

  onCreate() {
    if(this.heroForm.valid) {
      const formData = this.getFormData();

      const newHero: Hero = {
        id: uuid(),
        name: formData.name, 
        superpower: formData.superpower,
        imageUrl: formData.imageUrl || defaultImageUrl,
        description: formData.description,
        alive: formData.alive
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

  onEdit() {
    if(this.heroForm.valid) {
      const formData = this.getFormData();

      const newHeroData: Hero = {
        id: this.data.id,
        name: formData.name, 
        superpower: formData.superpower,
        imageUrl: formData.imageUrl || defaultImageUrl,
        description: formData.description,
        alive: formData.alive
      } 

      this.heroesService.editHero(this.data.id, newHeroData).subscribe({
        next: (success) => {
          if (success) {
            this.dialog.closeAll();
          } else {
            throw new Error('Something went wrong editing a hero');
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
      alive: new FormControl(),
    });
  }

  private fillInitialFormData() {
    this.heroForm.get('name')?.setValue(this.data.name);
    this.heroForm.get('superpower')?.setValue(this.data.superpower);
    this.heroForm.get('imageUrl')?.setValue(this.data.imageUrl);
    this.heroForm.get('description')?.setValue(this.data.description);
    this.heroForm.get('alive')?.setValue(this.data.alive);
  }

  private getFormData(): Hero {
    const name = this.heroForm.get('name')?.value;
    const superpower = this.heroForm.get('superpower')?.value;
    const imageUrl = this.heroForm.get('imageUrl')?.value;
    const description = this.heroForm.get('description')?.value;
    const alive = this.heroForm.get('alive')?.value;

    return  {
      id: '',
      name, 
      superpower,
      imageUrl,
      description,
      alive
    }
  }
}
