/**
 * Tipo que representa la información de una película.
 */
export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date?: string;
    genre_ids?: number[];
    vote_average?: number;
    popularity?: number;
    homepage?: string;
    tagline?: string;
    runtime?: number;
    budget?: number;
    revenue?: number;

};
/**
* Tipo que representa la respuesta de una consulta de películas.
*/
export type MovieResult = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number

}