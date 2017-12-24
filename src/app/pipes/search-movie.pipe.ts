import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchMovie'
})
export class SearchMoviePipe implements PipeTransform {

  transform(movies: any, term: string): any {
    if (term === undefined || term === null) return movies;
    
    return movies.filter((movie) => {
      //console.log(movie);
      return movie.Title.toLowerCase().includes(term.toString().toLowerCase());
    })
  }
}