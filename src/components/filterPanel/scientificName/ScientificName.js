import React, {Component} from 'react';

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class SpeciesNameFilter extends Component{

  constructor(){
    super();
    this.state={
      speciesName:[]
    }
  }


handleCheckboxes(event){
  console.log(event.target.checked);
  console.log(event.target.value);
  let speciesName=this.state.speciesName;
  if(event.target.checked){
    speciesName.push(event.target.value);
    let set=new Set(speciesName);
    speciesName=Array.from(set);
    set.clear();
  }
  else{
    let set =new Set(speciesName);
    set.delete(event.target.value);
    speciesName=Array.from(set);
    set.clear();
  }
  this.setState({
    speciesName
  })

     let events = new CustomEvent("speciesName-filter",{ "detail":{
         SpeciesName:speciesName
     }
     });
     document.dispatchEvent(events);
       event.preventDefault();
  }

  render(){
    return(
      <div>

        <label>
            <Checkbox
                value={"UNIDENTIFED"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"UnKnown"}
        </label>
        <br />
        <label>
            <Checkbox
                value={"IDENTIFED"}
                onChange={this.handleCheckboxes.bind(this)}
            />{"Known"}
        </label>

      </div>
    )
  }
}
export default SpeciesNameFilter;
