import React,{Component} from 'react';

class ObservationGridView extends Component{
display(objs,index){

let title=objs.name;
  return (
    <li key= {index}>
                <div style={{height:'280px',width:'200px'}} className="card ">
                    <img className="card-img-top" style={{height:'200px',width:'200px'}} src={objs.thumbnail} />
                    <div className="card-block">
                        <figure className="profile"  style={{height:'40px',width:'40px'}}>
                            <img src={objs.authorprofilepic} className="profile-avatar" alt="" />
                        </figure>
                        <i className="card-title"> {title}</i>
                    </div>
                </div>
        </li>
  )

}

render(){

return(
<ul className="list-inline responsive">
    {this.props.objsa.map(this.display.bind(this))}
</ul>

)
}

}
export default ObservationGridView