import React, { Component } from "react";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import LoadingComponent from "../loadingComponent.js";
import Traits from "../traits/TraitsObv.js";
import Groups from "../userGroup/Groups.js";
import CustomFields from "./CustomFields.js";
import RecoName from "./RecoName.js";

const CommentsFeeds = Loadable({
  loader: () => import("../activityFeed/CommentsFeeds"),
  loading: LoadingComponent,
});

class Tabs extends Component {
  constructor(props){
    super(props);
    this.state={
      Traitflag:0,
      Customflag:0,
      Groupsflag:0,
      Activityflag:0,
    }
    this.switchToCommentsTab = this.switchToCommentsTab.bind(this);
  }

  setTrait(){
  this.setState({Traitflag:1,Customflag:0,Groupsflag:0,Activityflag:0});
  }

  setCustom(){

  this.setState({Customflag:1,Traitflag:0,Groupsflag:0,Activityflag:0});
  }

  setGroup(){
  this.setState({Groupsflag:1,Traitflag:0,Customflag:0,Activityflag:0});
  }

  setActivity(){
  this.setState({Activityflag:1,Customflag:0,Traitflag:0,Groupsflag:0});
  }

  setGroup(){
    //console.log("groupcalled")
  this.setState({Groupsflag:1,Traitflag:0,Customflag:0,Activityflag:0});
  }

  setActivity(){
    console.log("activityCalled")
  this.setState({Activityflag:1,Traitflag:0,Customflag:0,Groupsflag:0})
  }

  setReco(){
  this.setState({Activityflag:0,Traitflag:0,Customflag:0,Groupsflag:0})

  }

  switchToCommentsTab(){
    //console.log("switchToCommentsTab")
    var comment = "commentsTab"+this.props.objs.id
    this.refs[comment].click();
  }

  render(){
    //console.log("tabs called gain",this.props.objs)
    return(
 <div className="panel with-nav-tabs panel-default" id={this.props.objs.id}>

            <ul className="nav nav-tabs">
                <li className="active"><a href={"#"+this.props.objs.id+"_tab1"} data-toggle="tab" onClick={this.setReco.bind(this)}>{this.props.LocaleData['default.suggestId.label']}</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab2"} data-toggle="tab" onClick={this.setGroup.bind(this)}>{this.props.LocaleData['default.groups.label']}</a></li>
                <li><a  href={"#"+this.props.objs.id+"_tab3"}  data-toggle="tab" data-tab-url={"#"+this.props.objs.id+"_tab3"} onClick={this.setTrait.bind(this)} >Traits</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab4"} data-toggle="tab" onClick={this.setCustom.bind(this)} >{this.props.LocaleData['default.customFields.label']}</a></li>
                <li><a href={"#"+this.props.objs.id+"_tab5"} ref={"commentsTab"+this.props.objs.id} data-toggle="tab" onClick={this.setActivity.bind(this)}>{this.props.LocaleData['default.comments.label']}</a></li>
            </ul>


              <div className="panel-body" style={{backgroundColor:'#e9f0d8',overflow:'visible'}}>
               <div className="tab-content">
                  <div className="tab-pane fade in active" id={this.props.objs.id+"_tab1"}>
                        <div>
                          {
                            (this.props.Recommendations && Object.keys(this.props.Recommendations).length>0 && this.props.Recommendations[this.props.objs.id] != null)?
                            <RecoName id={this.props.objs.id} islocked={this.props.objs.islocked} recos={this.props.Recommendations[this.props.objs.id]} ObvRenderAgain={this.props.ObvRenderAgain} rerun={this.props.rerun} style={{zIndex:'20'}}/>
                            :(
                              <div className="loader"></div>
                            )
                          }
                        </div>
                  </div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab2"}>{this.state.Groupsflag===1?<Groups id={this.props.objs.id}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab3"}>{this.state.Traitflag===1?<Traits id={this.props.objs.id} sGroup={this.props.objs.speciesgroupid} owner={this.props.objs.authorid}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab4"}>{this.state.Customflag===1?<CustomFields id={this.props.objs.id} owner={this.props.objs.authorid}/>:null}</div>
                  <div className="tab-pane fade" id={this.props.objs.id+"_tab5"}>{this.state.Activityflag===1?<CommentsFeeds id={this.props.objs.id}/>:null}</div>
               </div>
               </div>
             </div>


    )
  }
}
function mapStateToProps(state){
return {
  Recommendations:state.Recommendations,
  LocaleData:state.LocaleData
};
}

export default connect(mapStateToProps,null,null,{ withRef: true })(Tabs);
