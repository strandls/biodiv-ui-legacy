import React from 'react';
import Checkbox from 'rc-checkbox';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import 'rc-checkbox/assets/index.css';

class TaxonIdsFilter extends React.Component {
  constructor(){
    super();
    this.state={
      TaxonId:[]
    }

  }
  setParameter(){
    const newparams = queryString.parse(document.location.search);
    let data=[];
    if (newparams.taxonId) {
       data= newparams.taxonId.split(",");
    }else{
      data=[];
    }
    this.setState({
      TaxonId:data
    })
  }
  componentDidMount(){
    this.setParameter();
  }
  handleCheckboxes(event){
    let TaxonId=this.state.TaxonId;
    if(event.target.checked){
      TaxonId.push(event.target.value);
      let set=new Set(TaxonId);
      TaxonId=Array.from(set);
      set.clear();
    }
    else{
      let set =new Set(TaxonId);
      set.delete(event.target.value);
      TaxonId=Array.from(set);
      set.clear();
    }
    this.setState({
      TaxonId
    })

       let events = new CustomEvent("taxonId-filter",{ "detail":{
           taxonId:TaxonId
       }
       });
       document.dispatchEvent(events);
         event.preventDefault();
  }

  render() {
    return (
      <div>

        <div>
            <Checkbox
                checked={ this.state.TaxonId.includes("1")?true:false }
                value={"1"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" Has Taxon Id"}
        </div>
        <div>
            <Checkbox
                checked={ this.state.TaxonId.includes("0")?true:false }
                value={"0"}
                onChange={this.handleCheckboxes.bind(this)}
            />{" No Taxon Id"}
        </div>
      </div>
    )
  }
}

export default  withRouter(TaxonIdsFilter);