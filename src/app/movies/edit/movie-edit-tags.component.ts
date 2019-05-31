import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';

@Component({
  templateUrl: './movie-edit-tags.component.html'
})
export class MovieEditTagsComponent implements OnInit {
  errorMessage: string;
  newTags = '';
  movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      const dataName = 'movie';
      this.movie = data[dataName];
    });
  }

  // Add the defined tags
  addTags(): void {
    const tagArray = this.newTags.split(',');
    this.movie.tags = this.movie.tags ? this.movie.tags.concat(tagArray) : tagArray;
    this.newTags = '';
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.movie.tags.splice(idx, 1);
  }
}
