export interface Movie {
  title: string;
  releaseYear: string;
  content: string;
}

// Movies info
const movies: Movie[] = [
  // 1940s
  {
    title: "Casablanca",
    releaseYear: "1942",
    content:
      "Casablanca (102 min): An American expatriate must choose between his love for a woman and helping her and her fugitive husband escape Nazi capture in Casablanca. Directed by Michael Curtiz. Starring Humphrey Bogart, Ingrid Bergman. Drama/Romance, rated about 8.5 on IMDb.",
  },
  {
    title: "Citizen Kane",
    releaseYear: "1941",
    content:
      "Citizen Kane (119 min): The rise and fall of Charles Foster Kane, a publishing tycoon, told in non‑linear flashbacks. Directed by Orson Welles. Drama/Mystery, rated about 8.3 on IMDb.",
  },
  {
    title: "It's a Wonderful Life",
    releaseYear: "1946",
    content:
      "It's a Wonderful Life (130 min): An angel shows a community what life would have been like without a selfless man. Directed by Frank Capra. Starring James Stewart. Drama/Fantasy, rated about 8.6 on IMDb.",
  },
  {
    title: "Bicycle Thieves",
    releaseYear: "1948",
    content:
      "Bicycle Thieves (89 min): A working‑class man in post‑war Rome searches for his stolen bicycle with his young son. Directed by Vittorio De Sica. Italian Neorealism drama, rated about 8.3 on IMDb.",
  },
  {
    title: "Double Indemnity",
    releaseYear: "1944",
    content:
      "Double Indemnity (107 min): A seductive housewife and an insurance salesman plot a murder for profit. Directed by Billy Wilder. Film Noir/Crime, rated about 8.3 on IMDb.",
  },

  // 1950s
  {
    title: "Singin' in the Rain",
    releaseYear: "1952",
    content:
      "Singin' in the Rain (103 min): Hollywood’s transition to sound shakes up careers and romance. Directed by Gene Kelly, Stanley Donen. Musical/Comedy, rated about 8.3 on IMDb.",
  },
  {
    title: "Sunset Boulevard",
    releaseYear: "1950",
    content:
      "Sunset Boulevard (110 min): A faded silent‑film star and a struggling screenwriter form a tragic bond. Directed by Billy Wilder. Film Noir/Drama, rated about 8.4 on IMDb.",
  },
  {
    title: "All About Eve",
    releaseYear: "1950",
    content:
      "All About Eve (138 min): An aspiring actress insinuates herself into the life of an aging Broadway star. Directed by Joseph L. Mankiewicz. Drama, rated about 8.2 on IMDb.",
  },
  {
    title: "On the Waterfront",
    releaseYear: "1954",
    content:
      "On the Waterfront (108 min): A dockworker stands up to corrupt union bosses. Directed by Elia Kazan. Starring Marlon Brando. Drama, rated about 8.1 on IMDb.",
  },
  {
    title: "Vertigo",
    releaseYear: "1958",
    content:
      "Vertigo (128 min): A retired detective develops an obsession while investigating his friend's wife. Directed by Alfred Hitchcock. Mystery/Thriller, rated about 8.3 on IMDb.",
  },

  // 1960s
  {
    title: "Lawrence of Arabia",
    releaseYear: "1962",
    content:
      "Lawrence of Arabia (222 min): The epic story of T. E. Lawrence during WWI in the Arabian Peninsula. Directed by David Lean. Drama/Adventure, rated about 8.3 on IMDb.",
  },
  {
    title: "Psycho",
    releaseYear: "1960",
    content:
      "Psycho (109 min): A secretary steals money and hides at a secluded motel with a troubled proprietor. Directed by Alfred Hitchcock. Horror/Thriller, rated about 8.5 on IMDb.",
  },
  {
    title: "Dr. Strangelove",
    releaseYear: "1964",
    content:
      "Dr. Strangelove (95 min): Cold War satire about nuclear disaster and military paranoia. Directed by Stanley Kubrick. Comedy, rated about 8.4 on IMDb.",
  },
  {
    title: "Bonnie and Clyde",
    releaseYear: "1967",
    content:
      "Bonnie and Clyde (111 min): A glamorous outlaw couple on a crime spree during the Great Depression. Directed by Arthur Penn. Crime/Drama, rated about 7.9 on IMDb.",
  },
  {
    title: "2001: A Space Odyssey",
    releaseYear: "1968",
    content:
      "2001: A Space Odyssey (142 min): A voyage to Jupiter with HAL, an intelligent computer. Directed by Stanley Kubrick. Sci‑Fi/Adventure, rated about 8.3 on IMDb.",
  },

  // 1970s
  {
    title: "The Godfather",
    releaseYear: "1972",
    content:
      "The Godfather (175 min): The aging patriarch of an organized crime dynasty transfers control to his reluctant son. Directed by Francis Ford Coppola. Crime/Drama, rated about 9.2 on IMDb.",
  },
  {
    title: "The Godfather Part II",
    releaseYear: "1974",
    content:
      "The Godfather Part II (202 min): Parallel stories of young Vito Corleone and his son’s rule over the mafia empire. Directed by Francis Ford Coppola. Crime/Drama, rated about 9.0 on IMDb.",
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    releaseYear: "1975",
    content:
      "One Flew Over the Cuckoo's Nest (133 min): A rebellious inmate challenges a tyrannical nurse in a mental institution. Directed by Miloš Forman. Drama, rated about 8.7 on IMDb.",
  },
  {
    title: "Apocalypse Now",
    releaseYear: "1979",
    content:
      "Apocalypse Now (153 min): A U.S. captain goes on a covert mission during the Vietnam War. Directed by Francis Ford Coppola. War/Drama, rated about 8.4 on IMDb.",
  },
  {
    title: "Chinatown",
    releaseYear: "1974",
    content:
      "Chinatown (130 min): A private eye uncovers dark secrets in 1930s Los Angeles water rights scandal. Directed by Roman Polański. Crime/Mystery, rated about 8.2 on IMDb.",
  },

  // 1980s
  {
    title: "Raging Bull",
    releaseYear: "1980",
    content:
      "Raging Bull (129 min): The turbulent life of boxer Jake LaMotta. Directed by Martin Scorsese. Drama/Sport, rated about 8.2 on IMDb.",
  },
  {
    title: "The Empire Strikes Back",
    releaseYear: "1980",
    content:
      "The Empire Strikes Back (124 min): Luke Skywalker trains with Yoda while the Empire tightens its grip. Directed by Irvin Kershner. Sci‑Fi/Adventure, rated about 8.7 on IMDb.",
  },
  {
    title: "The Shining",
    releaseYear: "1980",
    content:
      "The Shining (146 min): A writer becomes dangerously influenced by spirits in a remote hotel. Directed by Stanley Kubrick. Horror, rated about 8.4 on IMDb.",
  },
  {
    title: "Back to the Future",
    releaseYear: "1985",
    content:
      "Back to the Future (116 min): A teen travels to 1955 and must reunite his parents to save his future. Directed by Robert Zemeckis. Sci‑Fi/Comedy, rated about 8.5 on IMDb.",
  },
  {
    title: "Die Hard",
    releaseYear: "1988",
    content:
      "Die Hard (132 min): A lone cop battles terrorists in a New York skyscraper. Directed by John McTiernan. Action/Thriller, rated about 8.2 on IMDb.",
  },

  // 1990s
  {
    title: "Goodfellas",
    releaseYear: "1990",
    content:
      "Goodfellas (146 min): The rise and fall of Henry Hill in the mafia world. Directed by Martin Scorsese. Crime/Drama, rated about 8.7 on IMDb.",
  },
  {
    title: "Pulp Fiction",
    releaseYear: "1994",
    content:
      "Pulp Fiction (154 min): Interweaving stories of crime in Los Angeles. Directed by Quentin Tarantino. Crime/Comedy/Drama, rated about 8.9 on IMDb.",
  },
  {
    title: "Schindler's List",
    releaseYear: "1993",
    content:
      "Schindler's List (195 min): A German industrialist saves Jewish lives during WWII. Directed by Steven Spielberg. Drama/History, rated about 8.9 on IMDb.",
  },
  {
    title: "Forrest Gump",
    releaseYear: "1994",
    content:
      "Forrest Gump (142 min): A man with a low IQ experiences defining moments of American history. Directed by Robert Zemeckis. Drama/Romance, rated about 8.8 on IMDb.",
  },
  {
    title: "The Matrix",
    releaseYear: "1999",
    content:
      "The Matrix (136 min): A hacker learns his reality is a simulated construct. Directed by Lana Wachowski & Lilly Wachowski. Sci‑Fi/Action, rated about 8.7 on IMDb.",
  },

  // 2000s
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    releaseYear: "2001",
    content:
      "The Fellowship of the Ring (178 min): A hobbit begins an epic quest to destroy a powerful ring. Directed by Peter Jackson. Fantasy/Adventure, rated about 8.8 on IMDb.",
  },
  {
    title: "Gladiator",
    releaseYear: "2000",
    content:
      "Gladiator (155 min): A betrayed Roman general fights as a gladiator for revenge. Directed by Ridley Scott. Historical/Action, rated about 8.5 on IMDb.",
  },
  {
    title: "The Dark Knight",
    releaseYear: "2008",
    content:
      "The Dark Knight (152 min): Batman faces the Joker in Gotham City. Directed by Christopher Nolan. Superhero/Crime, rated about 9.0 on IMDb.",
  },
  {
    title: "No Country for Old Men",
    releaseYear: "2007",
    content:
      "No Country for Old Men (122 min): A hunter finds cash and encounters a ruthless killer. Directed by Coen Brothers. Thriller/Crime, rated about 8.1 on IMDb.",
  },
  {
    title: "City of God",
    releaseYear: "2002",
    content:
      "City of God (130 min): Two boys grow up in the violent slums of Rio de Janeiro. Directed by Fernando Meirelles. Drama/Crime, rated about 8.6 on IMDb.",
  },

  // 2010s
  {
    title: "Inception",
    releaseYear: "2010",
    content:
      "Inception (148 min): A thief who enters dreams to steal secrets tries planting an idea. Directed by Christopher Nolan. Sci‑Fi/Thriller, rated about 8.8 on IMDb.",
  },
  {
    title: "The Social Network",
    releaseYear: "2010",
    content:
      "The Social Network (120 min): The founding of Facebook and ensuing lawsuits. Directed by David Fincher. Drama/Biography, rated about 7.7 on IMDb.",
  },
  {
    title: "Parasite",
    releaseYear: "2019",
    content:
      "Parasite (132 min): A poor family schemes to infiltrate a wealthy household. Directed by Bong Joon‑ho. Thriller/Drama, rated about 8.6 on IMDb.",
  },
  {
    title: "Mad Max: Fury Road",
    releaseYear: "2015",
    content:
      "Mad Max: Fury Road (120 min): A woman rebels against a tyrannical ruler in a post‑apocalyptic desert. Directed by George Miller. Action/Adventure, rated about 8.1 on IMDb.",
  },
  {
    title: "La La Land",
    releaseYear: "2016",
    content:
      "La La Land (128 min): A jazz musician and actress chase their dreams in Los Angeles. Directed by Damien Chazelle. Musical/Romance, rated about 8.0 on IMDb.",
  },
  // Duplicated
  {
    title: "Mission: Impossible – The Final Reckoning",
    releaseYear: "2025",
    content:
      "Mission: Impossible – The Final Reckoning (169 min): Ethan Hunt and his team face a ruthless AI system named 'The Entity' that threatens global security. Starring Tom Cruise, Simon Pegg, Ving Rhames. Directed by Christopher McQuarrie. Released May 23, 2025. Action/Adventure thriller.",
  },
  {
    title: "Thunderbolts",
    releaseYear: "2025",
    content:
      "Thunderbolts (127 min): A covert government‑sanctioned team of super‑villains, including Yelena Belova and Bucky Barnes, must execute a dangerous mission while confronting their own turbulent pasts. Directed by Jake Schreier. Released May 2, 2025. Action/Sci‑Fi.",
  },
  {
    title: "Jurassic World Rebirth",
    releaseYear: "2025",
    content:
      "Jurassic World Rebirth (approx 140 min): A family stranded on a dinosaur‑infested island fight for survival when prehistoric predators emerge. Directed by Gareth Edwards. Released July 2, 2025. Sci‑Fi/Adventure.",
  },
  {
    title: "Superman",
    releaseYear: "2025",
    content:
      "Superman (approx 145 min): Clark Kent returns as Superman to reconcile his Kryptonian heritage with human life and battle Lex Luthor. Starring David Corenswet. Directed by James Gunn. Released July 11, 2025. Action/Superhero.",
  },
  {
    title: "Elio",
    releaseYear: "2025",
    content:
      "Elio (approx 95 min): A young boy is accidentally recruited as Earth’s ambassador to an interplanetary organization after being beamed up by aliens. Voices include Yonas Kibreab, Zoë Saldaña. Released June 20, 2025. Animated/Sci‑Fi Comedy.",
  },
];

export default movies;
