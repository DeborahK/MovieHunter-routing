import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Movie } from '../movie';

@Component({
  templateUrl: './movie-edit-info.component.html'
})
export class MovieEditInfoComponent implements OnInit {
  @ViewChild(NgForm) movieForm: NgForm;

  errorMessage: string;
  movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.movie = data['movie'];

      if (this.movieForm) {
        this.movieForm.reset();
      }
    });
  }
}
