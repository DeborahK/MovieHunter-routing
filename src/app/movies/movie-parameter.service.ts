import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieParameterService {
  filterBy = '';
  displayPosters = false;
}
