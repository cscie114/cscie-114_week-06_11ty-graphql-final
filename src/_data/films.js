require('dotenv').config();

// Set up constants used in this query
const swapiEndpoint  = "https://swapi-graphql.netlify.app/.netlify/functions/index"; 
const graphQL        = JSON.stringify({
    query: `query AllFilms {
        allFilms {
            films {
                title
                episodeID
                openingCrawl
                director
                producers
                releaseDate
                id
                characterConnection {
                    characters {
                        name
                        id
                    }
                }
                planetConnection {
                    planets {
                        name
                        id
                    }
                }
                starshipConnection {
                    starships {
                        name
                        id
                    }
                }
                vehicleConnection {
                    vehicles {
                        name
                        id
                    }
                }
            }
        }
    }`
});
const fetchOptions   = {
    "method":  "POST",
    "body":    graphQL,
    "headers": {
        "Content-Type": "application/json"
    }
}

module.exports = async function() {
    let filmsData = {};
    try {
        let response = await fetch(swapiEndpoint, fetchOptions);
        filmsData   = await response.json();

    } catch (err) {
        console.log("Error in films.js fetch: " + err);
    }
   
    return filmsData;
}
