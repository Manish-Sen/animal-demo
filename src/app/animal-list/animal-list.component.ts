import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  imports: [CommonModule, FormsModule, CarouselModule],
  providers: [provideAnimations()]
})
export class AnimalListComponent implements OnInit {
  animals: Array<any> = [];
  query = '';
  gender = 'All';
  type = 'All';
  page = 1;
  pageSize = 10;
  isLoading = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.isLoading = true;
    this.animalService.filterAnimals(this.query, this.gender, this.type)
      .subscribe((animals) => {
        this.animals = animals.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        this.isLoading = false;
      });
  }

  onSearch(): void {
    this.page = 1;
    this.loadAnimals();
  }

  onGenderChange(gender: string): void {
    this.gender = gender;
    this.loadAnimals();
  }

  onTypeChange(type: string): void {
    this.type = type;
    this.loadAnimals();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadAnimals();
  }

  viewDetails(animal: any) {
    this.router.navigate(['animal/' + animal.id]);
  }
}