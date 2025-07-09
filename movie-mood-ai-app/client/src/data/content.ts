export interface Movie {
  title: string;
  releaseYear: string;
  content: string;
}

// Movies info
const movies: Movie[] = [
  {
    title: "Avatar: The Way of the Water",
    releaseYear: "2022",
    content:
      "Avatar: The Way of Water (3 hr 10 min): Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home. Action, Adventure, Fantasy film released in 2022. Directed by James Cameron Written by James Cameron, Rick Jaffa and Amanda Silver. Starring Sam Worthington, Zoe Saldana and Sigourney Weaver. Rated 7.6 on IMDB",
  },
  {
    title: "The Fabelmans",
    releaseYear: "2022",
    content:
      "The Fabelmans (2 hr 31 min): Growing up in post-World War II era Arizona, young Sammy Fabelman aspires to become a filmmaker as he reaches adolescence, but soon discovers a shattering family secret and explores how the power of films can help him see the truth. Drama film released in 2022. Directed by Steven Spielberg. Written by Steven Spielberg and Tony Kushner. Starring Michelle Williams, Gabriel LaBelle & Paul Dano. Rated 7.5 on IMDB",
  },
  {
    title: "Troll",
    releaseYear: "2022",
    content:
      "Troll (1 hr 41 min): Deep in the Dovre mountain, something gigantic wakes up after a thousand years in captivity. The creature destroys everything in its path and quickly approaches Oslo. Norwegian action, adventure, drama film released in 2022. Directed by Roar Uthaug. Written by Espen Aukan and Roar Uthaug. Starring Ine Marie Wilmann, Kim Falck and Mads Sjøgård Pettersen. Rated 5.8 on IMDB",
  },
  {
    title: "Everything Everywhere All at Once",
    releaseYear: "2022",
    content:
      "Everything Everywhere All at Once (2 hr 19 min): A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led. Action, Adventure, Comedy film released in 2022. Directed by Daniel Kwan and Daniel Scheinert. Written by Daniel Kwan and Daniel Scheinert. Starring: Michelle Yeoh, Stephanie Hsu and Jamie Lee Curtis. Rated 7.8 on IMDB",
  },
  {
    title: "Oppenheimer",
    releaseYear: "2023",
    content:
      "Oppenheimer (3 hr): The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb. Biography, Drama, History film released in 2023. Directed by Christopher Nolan. Written by Christopher Nolan, Kai Bird and Martin Sherwin. Starring Cillian Murphy, Emily Blunt and Matt Damon. Rated 8.5 on IMDB",
  },
  {
    title: "Barbie",
    releaseYear: "2023",
    content:
      "Barbie (1 hr 54 min): Barbie suffers a crisis that leads her to question her world and her existence. Adventure, Comedy, Fantasy film released in 2023. Directed by Greta Gerwig. Written by Greta Gerwig and Noah Baumbach. Starring Margot Robbie, Ryan Gosling and Issa Rae. Rated 7.0 on IMDB",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    releaseYear: "2023",
    content:
      "Spider-Man: Across the Spider-Verse (2 hr 20 min): Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero. Animation, Action, Adventure film released in 2023. Directed by Joaquim Dos Santos, Kemp Powers an Justin K. Thompson. Written by Phil Lord, Christopher Miller and Dave Callaham. Starring: Shameik Moore, Hailee Steinfeld and Brian Tyree Henry. Rated 8.7 on IMDB",
  },
  {
    title: "Pathaan",
    releaseYear: "2023",
    content:
      "Pathaan (2 hr 26 min): An Indian agent races against a doomsday clock as a ruthless mercenary, with a bitter vendetta, mounts an apocalyptic attack against the country. Bollywood action, adventure, triller film released in 2023. Directed by Siddharth Anand. Written by Shridhar Raghavan, Abbas Tyrewala and Siddharth Anand. Starring Shah Rukh Khan, Deepika Padukone and John Abraham. Rated 5.9 on IMDB",
  },
  {
    title: "RRR",
    releaseYear: "2022",
    content:
      "RRR (3 hr 7 min): A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s. South Indian action, drama film released in 2022. Directed by S. S. Rajamouli. Written by Vijayendra Prasad, S. S. Rajamouli and Sai Madhav Burra. Starring N. T. Rama Rao Jr., Ram Charan and Ajay Devgn. Rated 7.8 on IMDB",
  },
  {
    title: "Elemental",
    releaseYear: "2023",
    content:
      "Elemental (1 hr 41 min): Ember, a fiery young woman, and Wade, a go-with-the-flow guy, discover how much they actually have in common in a city where fire, water, land, and air residents live together. Animated Adventure Comedy film released in 2023. Directed by Peter Sohn. Starring Leah Lewis, Mamoudou Athie and Ronnie Del Carmen. Rated 7.0 on IMDB",
  },
  {
    title: "Top Gun: Maverick",
    releaseYear: "2022",
    content:
      "Top Gun: Maverick (2 hr 10 min): After more than 30 years of service, Maverick trains a new group of Top Gun graduates for a high-risk mission, while confronting the ghosts of his past. Action, Drama film released in 2022. Directed by Joseph Kosinski. Starring Tom Cruise, Jennifer Connelly and Miles Teller. Rated 8.3 on IMDB",
  },
  {
    title: "The Menu",
    releaseYear: "2022",
    content:
      "The Menu (1 hr 47 min): A young couple travels to a remote island for an exclusive dining experience hosted by a celebrity chef who has prepared some shocking surprises. Comedy, Thriller film released in 2022. Directed by Mark Mylod. Starring Ralph Fiennes, Anya Taylor-Joy and Nicholas Hoult. Rated 7.2 on IMDB",
  },
  {
    title: "M3GAN",
    releaseYear: "2022",
    content:
      "M3GAN (1 hr 42 min): A robotics engineer creates a life-like doll to be a child's companion, but the doll becomes overly protective and dangerous. Horror, Sci-Fi film released in 2022. Directed by Gerard Johnstone. Starring Allison Williams, Violet McGraw and Ronny Chieng. Rated 6.4 on IMDB",
  },
  {
    title: "Glass Onion",
    releaseYear: "2022",
    content:
      "Glass Onion (2 hr 19 min): Detective Benoit Blanc travels to a private Greek island when a tech billionaire invites his friends for a murder mystery party, but real dangers unfold. Comedy, Mystery film released in 2022. Directed by Rian Johnson. Starring Daniel Craig, Edward Norton and Kate Hudson. Rated 7.1 on IMDB",
  },
  {
    title: "The Super Mario Bros. Movie",
    releaseYear: "2023",
    content:
      "The Super Mario Bros. Movie (1 hr 32 min): Brooklyn plumbers Mario and Luigi are transported to a magical world where they embark on an epic adventure to save a captured princess. Animation, Adventure, Comedy film released in 2023. Directed by Aaron Horvath, Michael Jelenic and Pierre Leduc. Starring Chris Pratt, Anya Taylor-Joy and Charlie Day. Rated 7.1 on IMDB",
  },
  {
    title: "A Haunting in Venice",
    releaseYear: "2023",
    content:
      "A Haunting in Venice (1 hr 43 min): A retired detective attends a seance in post-WWII Venice, and when a guest is murdered, he is drawn into solving the case. Crime, Drama, Mystery film released in 2023. Directed by Kenneth Branagh. Starring Kenneth Branagh, Michelle Yeoh and Jamie Dornan. Rated 6.8 on IMDB",
  },
  {
    title: "Blue Beetle",
    releaseYear: "2023",
    content:
      "Blue Beetle (2 hr 7 min): Jaime Reyes becomes the symbiotic host to an alien artifact called the Scarab, gaining extraordinary powers and a powerful armor suit. Action, Adventure, Sci-Fi film released in 2023. Directed by Angel Manuel Soto. Starring Xolo Maridueña, Bruna Marquezine and Becky G. Rated 6.7 on IMDB",
  },
  {
    title: "Expend4bles",
    releaseYear: "2023",
    content:
      "Expend4bles (1 hr 43 min): The Expendables, a team of elite mercenaries, undertake dangerous missions too risky for anyone else, relying on their firepower and loyalty. Action film released in 2023. Directed by Scott Waugh. Starring Jason Statham, 50 Cent and Megan Fox. Rated 5.0 on IMDB",
  },
  {
    title: "Asteroid City",
    releaseYear: "2023",
    content:
      "Asteroid City (1 hr 45 min): A grieving father takes his family to a junior stargazing event in a remote desert town, where unexpected revelations transform his view of life. Comedy, Drama, Sci-Fi film released in 2023. Directed by Wes Anderson. Starring Jason Schwartzman, Scarlett Johansson and Tom Hanks. Rated 6.6 on IMDB",
  },
];

export default movies;
