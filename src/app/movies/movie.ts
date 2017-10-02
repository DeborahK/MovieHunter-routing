/* Defines the movie entity */
export interface IMovie {
    id: number;
    approvalRating: number;
    description: string;
    director: string;
    imageurl: string;
    mpaa: string;
    price: number;
    releaseDate: string;
    starRating: number;
    title: string;
    category: string;
    tags?: string[];
}
