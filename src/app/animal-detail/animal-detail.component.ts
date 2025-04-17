import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AnimalDetailComponent implements OnInit {
  animal: any;
  isAdopted = false;

  constructor(private route: ActivatedRoute, private animalService: AnimalService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.animalService.getAnimals().subscribe(animals => {
      this.animal = animals.find(a => a.id == id);
    });
  }

  adoptAnimal(): void {
    this.isAdopted = true;
    this.snackBar.open('You have adopted ' + this.animal.name, 'Close', { duration: 3000 });
  }
}