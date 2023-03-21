<template>
  	<header>
		<SearchBar />
	</header>
  	<main>
		<h1 class="main__title">Trending Now</h1>
		<FilmsGrid>
			<FilmCard
				v-for="film in getFilms"
				v-bind:key="film.id"
				v-bind:character="film.name"
			></FilmCard>
		</FilmsGrid>
	</main>

</template>

<script lang="ts">
	import SearchBar from './components/SearchBar.vue'
	import FilmsGrid from './components/FilmsGrid.vue'
	import FilmCard from './components/FilmCard.vue'

	export default {
		components: {
			SearchBar,
			FilmsGrid,
			FilmCard,
		},
		data() {
			return {
				films: [
					{id: 1, name: 'A New Hope', image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'},
					{id: 2, name: 'The Empire Strikes Back', image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'},
					{id: 3, name: 'Return of the Jedi', image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'},
					{id: 4, name: 'The Phantom Menace', image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'},
					{id: 5, name: 'Attack of the Clones', image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Star_Wars_Episode_II_Attack_of_the_Clones.jpg'},
					{id: 6, name: 'Revenge of the Sith', image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'},
					{id: 7, name: 'The Force Awakens', image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'},
					{id: 8, name: 'The Last Jedi', image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'},
					{id: 9, name: 'The Rise of Skywalker', image: 'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker.jpg'},
				] as any,
			}
		},

		computed: {
			getFilms(){
				return this.films;
			}
		}
		
		
	}

</script>

<style scoped lang="scss">
	header{
		padding: 4% 0 4% 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	main {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 6fr;
	}

	.main__title{
		align-self: center;
		margin: 0 0 2% 3.5%;
		color: #99aabb5a;
		font-size: 2.5rem;
		font-weight: 700;
	}

</style>
