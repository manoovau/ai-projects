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

- Next.js / React – Frontend framework
- Supabase – Database and embeddings API
- OpenAI API – ChatGPT + Embeddings
- TMDB API – Fetch movie posters and metadata
- Tailwind CSS – UI styling

## Download project.

Clone movie-mood-ai-app folder. It includes all dependencies.

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

- create ".env" file inside "sever" folder.
- Add TMDb API key and OpenAI API KEY inside ".env" file and save changes:

```
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TMDB_API_KEY=your_tmdb_key_here
```

## Install package(s).

1. Open terminnal, go to: client folder and run script `npm install` in the command line.

```
  cd client
  npm run dev
```

2. Open terminal, go to: server folder and run script `npm install` in the command line.

```
  cd server
  node index.js
```

## Open project.

1. Go to client terminnal (client folder) and run script `npm run dev` in the command line.

```
  npm run dev
```

2. Go to server terminal (server folder) and run script `node index.js` in the command line.

```
  node index.js
```
