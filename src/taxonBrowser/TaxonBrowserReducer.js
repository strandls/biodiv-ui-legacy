import {FETCH_TAXON_LIST} from './TaxonBrowserActions';

export default function(state=[],action){
  switch (action.type) {
    case FETCH_TAXON_LIST:
    if(action.payload.data)
    return  action.payload.data
    default:
    return state
  }
  return state;
}
