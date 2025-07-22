# Movie Mood AI App.

## API keys.

- Get TMDb API KEY:
  - Create a TMDb account and get your API key
  - Sign up: https://www.themoviedb.org/signup
  - Get API key (TMDB_API_KEY): https://www.themoviedb.org/settings/api
- Get OpenAI API KEY:
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

## Open project.

1. Open terminnal, go to: client folder and run script `npm run dev` in the command line.

```
  cd client
  npm run dev
```

2. Open terminal, go to: server folder and run script `node ` in the command line.

```
  cd server
  node index.js
```
