import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from '../movie';

@Component({
    templateUrl: './movie-edit-tags.component.html'
})
export class MovieEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    movie: IMovie;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.movie = data['movie'];
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
