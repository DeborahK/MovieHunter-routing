import { Injectable } from '@angular/core';

@Injectable()
export class MovieParameterService {
    filterBy: string = '';
    displayPosters = false;
}
