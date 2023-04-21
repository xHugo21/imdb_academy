# IMDb Academy Project by Juan Manuel Manga Hurtado and Hugo García Cuesta

## Description

Webpage designed by Hugo García to provide a clean and user friendly interface to search, discover and save films and tv series. The content is fetched from an [API](https://github.com/juanma6245/search-academy-project) developed by Juan Manuel Manga. Posters, descriptions and trailers are fetched from TMDB API.

## Homepage

![](/front/src/assets/homepage.png)

## Light Mode

![](/front/src/assets/light_mode.png)

## Filters

![](/front/src/assets/filters.png)

## Magic Wand

![](/front/src/assets/magic_wand.png)

## Media Info

![](/front/src/assets/film_info.png)

## Saved

![](/front/src/assets/saved.png)

## Features

- See top rated films and tv series. Switch easily between them
- Search content by title
- Filter content by type, year of release, duration, genre and rating
- Save / Bookmark content
- Magic wand: Select wand icon and click a content to get similar results
- See descriptions, reviews, ratings, cast (directors and actors if available) and trailers about the content
- Infinite scroll
- Back to top button for improved user experience
- Dark / Light mode

## Execution

1. Clone the resository

```
git clone https://github.com/xHugo21/imdb_academy/tree/with_api
```

2. Go inside search_academy_project and build the docker container

```
cd imdb_academy
cd search_academy_project
docker compose up --build
```

3. Go inside front directory and run the local development server

```
cd ..
cd front
npm run dev
```
