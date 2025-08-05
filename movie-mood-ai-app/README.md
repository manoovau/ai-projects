# Movie Mood AI App.

Movie Mood AI App is a smart movie recommendation tool that helps you find the perfect movie based on your mood and preferences. Whether you're watching alone or with friends, the app delivers curated suggestions powered by AI or embeddings.

## What It Does

You fill out a short form about your mood and viewing context, and the app shows you a personalized movie recommendation.
You can choose one of two recommendation engines:

- ChatGPT Mode: Uses ChatGPT to analyze your answers and generate a custom movie recommendation.
- Embeddings Mode: Converts your input into vector embeddings and finds the most similar entry in a Supabase movie database.

## Modes

- Solo Mode: For individual users. Get movie suggestions based on your personal mood and preferences.
- Group Mode (up to 20 people): Everyone in your group can enter their preferences, and the app suggests a movie that best fits the group’s overall mood.

## Result Display

Each recommended movie is displayed as a card that includes:

- Poster (fetched from the TMDB API)
- Title
- Release Year
- Description

### You also get intuitive navigation options:

    -  Next Movie: View another recommendation
    - Previous Movie: Go back to the last one
    - Reset: Clear your inputs and start over

## Technologies Used

- React / Vite / TypeScript – Frontend
- Supabase – Embeddings and movie database
- OpenAI API – ChatGPT + Embeddings
- TMDB API – Fetch movie posters and metadata
- Tailwind CSS – UI styling
- Express – Backend
- Playwright – End-to-end testing

## Download project.

Clone movie-mood-ai-app folder. It includes all dependencies.

```
git clone https://github.com/manoovau/movie-mood-ai-app.git
cd movie-mood-ai-app

```

## API keys.

### TMDb API KEY

- Create a TMDb account and get your API key
- Sign up: https://www.themoviedb.org/signup
- Get API key (TMDB_API_KEY): https://www.themoviedb.org/settings/api

### OpenAI API KEY:

- Sign up or log in to OpenAI
- Go to the API dashboard: https://platform.openai.com/account/api-keys
- Click the “+ Create new secret key” button.
- Name your key (optional, e.g., my-movie-app) and click Create.
- Copy the key (OPENAI_API_KEY) immediately. You won’t be able to see it again!
  Example format:

```
  sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Supabase API KEY

- Sign up or log in to Supabase: https://supabase.com/
- Create a new project and `movie_mood` table or use an existing one. (contact me if you want to use the existing one)
- Go to your project dashboard and select Settings > API.
- Copy the URL and the anon/public API key.

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-public-api-key
```

### Create .env file

- create ".env" file inside "sever" folder.
- Add TMDb API key and OpenAI API KEY inside ".env" file and save changes:

```
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TMDB_API_KEY=your_tmdb_key_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-public-api-key
```

## Install dependencies.

1.1 Go to movie-mood-ai-app folder terminal and run script `npm install` in the command line.

```
 npm install
```

1.2 or you can run it separately in each folder if needed.

1.2.1 Go to movie-mood-ai-app folder terminal and run script `npm install` in the command line.

```
 npm install
```

1.2.2 Open terminal, go to: client folder and run script `npm install` in the command line.

```
  cd client
  npm install
```

1.2.3. Open terminal, go to: server folder and run script `npm install` in the command line.

```
  cd server
  npm install
```

## Open project.

1.1 Go to movie-mood-ai-app folder terminal and run script `npm run dev` in the command line.

```
  npm run dev
```

1.2 or you can run it separately in each folder if needed.

1.2.1 Go to client terminnal (client folder) and run script `npm run dev` in the command line.

```
  npm run dev
```

1.2.2 Go to server terminal (server folder) and run script `node index.js` in the command line.

```
  node index.js
```
