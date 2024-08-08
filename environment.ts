type Environment = {
    url_movie: string;
    url_poster:string;
    api_movie: string;
    token_movie: string;
}
export const environment: Environment = {
    url_movie: 'https://api.themoviedb.org/3',
    url_poster :'https://image.tmdb.org/t/p/w300',
    api_movie: '40e238e99b2e3f44538b81a5226837f1',
    token_movie: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGUyMzhlOTliMmUzZjQ0NTM4YjgxYTUyMjY4MzdmMSIsIm5iZiI6MTcyMzA2NDQ3Mi42MzAyODksInN1YiI6IjY2YjNkZjVlMGQzZmZhNTVjODZmNzdjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dt8ouEG7bP2KmxhM1jtdxd9LHoC-9Y6DMtHeQ5qcnuY'
}