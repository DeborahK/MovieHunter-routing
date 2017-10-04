import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IMovie } from './movie';

export class MovieData implements InMemoryDbService {

    createDb() {
        const movies: IMovie[] = [
            {
                'id': 1,
                'approvalRating': 0.97,
                'description': 'A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.',
                'director': 'Peter Jackson',
                'imageurl': 'http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Fellowship-Of-The-Ring_small.jpg',
                'mpaa': 'pg-13',
                'price': 12.95,
                'releaseDate': '2001-12-19T00:00:00',
                'starRating': 4.88,
                'title': 'The Lord of the Rings: The Fellowship of the Ring',
                'category': 'action',
                'tags': ['action', 'adventure', 'hobbits']
            }
            ,
            {
                'id': 2,
                'director': 'Peter Jackson',
                'description': "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron/'s new ally, Saruman, and his hordes of Isengard.",
                'imageurl': 'http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Two-Towers_small.jpg',
                'mpaa': 'pg-13',
                'releaseDate': '2002-12-18T00:00:00',
                'title': 'The Lord of the Rings: The Two Towers',
                'price': 14.95,
                'starRating': 4.2,
                'approvalRating': 0.94,
                'category': 'action',
                'tags': ['action', 'adventure', 'hobbits']
            },
            {
                'id': 3,
                'director': 'Peter Jackson',
                'description': "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
                'imageurl': 'http://www.coverwhiz.com/content/The-Lord-Of-The-Rings-The-Return-Of-The-King_small.jpg',
                'mpaa': 'pg-13',
                'releaseDate': '2003-12-17T00:00:00',
                'title': 'The Lord of the Rings: The Return of the King',
                'price': 15.95,
                'starRating': 4.5,
                'approvalRating': 0.9895,
                'category': 'action',
                'tags': ['action', 'adventure', 'hobbits']
            },
            {
                'id': 4,
                'director': 'Fred Wolf',
                'description': "An animated story of an unusual kingdom in which everything and everybody is pointed - except for a young boy named Oblio. Despite his round head, Oblio has many friends. But an evil count, jealous that Oblio is more popular than his own son, says that without a pointed head, Oblio is an outlaw. Along with his faithful dog Arrow, Oblio is exiled to the Pointless Forest. There, he has many fantastic experiences (including encounters with a 3-headed man, giant bees, a tree in the leaf-selling business, and a good-humored old rock). From his adventures, Oblio learns that it is not at all necessary to be pointed to have a point in life. Music composed and performed by Harry Nilsson ('Me and My Arrow'), who also wrote the story. ",
                'imageurl': '',
                'mpaa': 'nr',
                'releaseDate': '1971-02-02T00:00:00',
                'title': 'The Point',
                'price': 9.95,
                'starRating': 4.9,
                'approvalRating': 0.9295,
                'category': 'animation',
                'tags': ['action', 'animation']
            },
            {
                'id': 5,
                'director': 'Chris Columbus',
                'description': 'When aliens misinterpret video feeds of classic arcade games as a declaration of war, they attack the Earth in the form of the video games.',
                'imageurl': '',
                'mpaa': 'pg-13',
                'releaseDate': '2015-07-24T00:00:00',
                'title': 'Pixels',
                'price': 5.59,
                'starRating': 2.7,
                'approvalRating': 0.17,
                'category': 'animation',
                'tags': ['action', 'animation']
            }
        ];
        return { movies };
    }
}
