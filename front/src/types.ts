/*export type Film = {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: Array<number>
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}*/

export type Film = {
    id: string,
    tconst: string,
    titleType: string,
    primaryTitle: string,
    originalTitle: string,
    startYear: number,
    endYear: number,
    runtimeMinutes: number,
    genres: Array<string>,
    averageRating: number,
    numVotes: number
    akas: Array<string>,
    directors: Array<string>,
    starring: Array<string>,
    isAdult: boolean,
    overview?: string,
    posterPath?: string,

}
