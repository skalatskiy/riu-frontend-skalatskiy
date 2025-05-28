import { Component, Inject, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Hero } from '../../schemas/hero.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-hero',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './delete-hero.component.html',
  styleUrl: './delete-hero.component.css'
})
export class DeleteHeroComponent {
  private heroesService: HeroesService = inject(HeroesService);

  constructor(
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  onDelete() {
    this.heroesService.deleteHero(this.data.id).subscribe({
      next: (success) => {
        if (success) {
          this.dialog.closeAll();
        }
      }
    });
  }

  onCancel() {
    this.dialog.closeAll();
  }
}
