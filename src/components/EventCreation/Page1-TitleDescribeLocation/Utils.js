import { bingMapsKey } from '../../../config';
import { updateNewEventState } from '../../../actions/New-Event';

export function validateCity(setState, dispatch, locationOption){
  const city = document.getElementsByName('cityLocation')[0].value.trim();
  const state = document.getElementsByName('stateLocation')[0].value;

  //Error Handle
  if (!city || !state) {
    return setState({locationFeedback: 'Must provide a city and state'});
  } else if (city.length < 3) {
    return setState({locationFeedback: 'Must provide a longer city name.'});
  }

  setState({locationFeedback: 'Checking city...'});
    
  // Get Latitude and Longitude
  return fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${city}%20${state}&includeNeighborhood=0&&key=${bingMapsKey}`)
    .then(res => res.json())
    .then(bingMapsResult => {
      let possibleResults = bingMapsResult.resourceSets[0].resources;
      // Remove non-USA options
      possibleResults = possibleResults.filter(place => place.address.countryRegion === 'United States');
      let verifiedCity = possibleResults.find(place => place.name.toLowerCase() === `${city}, ${state}`.toLowerCase())
    
      // If there is an exact match for city and state
      if (verifiedCity) {
        return setState({
          locationFeedback: `Successfully found ${verifiedCity.name}.`,
          locationOption: 1
        }, () => {
          dispatch(updateNewEventState({location: {latitude: verifiedCity.point.coordinates[0], longitude: verifiedCity.point.coordinates[1]}}));
        })
      } 
        // If no exact match, cycle through each option that provides a city and state
        else {
          let optionCount = 0;
          possibleResults.forEach( (place, i) => {
            if (place.address.locality) {
              optionCount++;
              if (optionCount === locationOption 
                && ( !possibleResults[i-1] || place.name !== possibleResults[i-1].name) ) {
                verifiedCity = place;
              }
            }
          })
          if (verifiedCity) {
            return setState({locationFeedback: `Did you mean ${verifiedCity.name}?`}, () => {
              dispatch(updateNewEventState({location: 
                {latitude: verifiedCity.point.coordinates[0], longitude: verifiedCity.point.coordinates[1]}
              }));
            })
          } else {
            return setState({
              locationFeedback: 'Must provide a valid US city and state.',
              locationOption: 1
            });
          }
        }
      })
      .catch(err => console.error(err));
}