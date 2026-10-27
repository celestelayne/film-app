import { parseFilms } from '../types'

// Validated when this module loads: invalid starter data throws and names the offending entry.
export const films = parseFilms([
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    runtimeMinutes: 132,
    genres: ['Thriller', 'Comedy', 'Drama'],
    director: 'Bong Joon-ho',
    actors: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    description:
      'A poor family schemes to get hired by a wealthy household, and the arrangement unravels in ways nobody planned.',
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    year: 2001,
    runtimeMinutes: 125,
    genres: ['Animation', 'Fantasy'],
    director: 'Hayao Miyazaki',
    description:
      'A girl wandering into a world of spirits must work in a bathhouse to free her parents and find her way home.',
  },
  {
    id: 'moonlight',
    title: 'Moonlight',
    year: 2016,
    runtimeMinutes: 111,
    genres: ['Drama'],
    director: 'Barry Jenkins',
    actors: ['Trevante Rhodes', 'André Holland', 'Mahershala Ali', 'Naomie Harris'],
    description:
      'Three chapters follow a young Black man in Miami as he grows up and works out who he is.',
  },
  {
    id: 'portrait-of-a-lady-on-fire',
    title: 'Portrait of a Lady on Fire',
    year: 2019,
    runtimeMinutes: 122,
    genres: ['Drama', 'Romance'],
    director: 'Céline Sciamma',
    actors: ['Noémie Merlant', 'Adèle Haenel'],
    description:
      'In 18th-century Brittany, a painter is commissioned to paint the portrait of a reluctant bride-to-be, and the two grow close.',
  },
  {
    id: 'mad-max-fury-road',
    title: 'Mad Max: Fury Road',
    year: 2015,
    runtimeMinutes: 120,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'George Miller',
    actors: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    description:
      'In a desert wasteland, a drifter and a rebel driver flee a tyrant across a long, violent chase.',
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    year: 2023,
    runtimeMinutes: 106,
    genres: ['Drama', 'Romance'],
    director: 'Celine Song',
    actors: ['Greta Lee', 'Teo Yoo', 'John Magaro'],
  },
  {
    id: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    runtimeMinutes: 139,
    genres: ['Sci-Fi', 'Comedy', 'Action'],
    director: 'Daniel Kwan, Daniel Scheinert',
    actors: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jamie Lee Curtis'],
    description:
      'A laundromat owner is pulled into a multiverse conflict where she must connect with versions of herself.',
  },
  {
    id: 'paris-texas',
    title: 'Paris, Texas',
    year: 1984,
    genres: ['Drama'],
    director: 'Wim Wenders',
    actors: ['Harry Dean Stanton', 'Nastassja Kinski', 'Dean Stockwell'],
    description:
      'A man who disappeared years ago walks out of the desert and tries to reconnect with his young son and his estranged wife.',
  },
])
