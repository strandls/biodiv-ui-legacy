import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery'
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './recoName.css'

import { Config } from '../Config';
import RecoComment from './RecoComment.js'
import AuthUtils from '../auth/AuthUtils.js';
import Formsuggest from './Form.js'
import ModalPopup from '../auth/Modal.js';

import {fetchRecommendations} from '../actions'

class RecoName extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      response:this.props.recos['recoVotes'],
      login_modal:false,
      options:'',
      groupName:undefined
    }
    this.authArray=[];
    this.getRecoName=this.getRecoName.bind(this)

  }

  getRecoName(id){
    var obvIds = []
    obvIds.push(id)
    var options = {
      method: 'GET',
      url :     Config.api.API_ROOT_URL+"/observation/recommendationVotes",
      params:{
        obvIds:obvIds.toString()
      },
      json: 'true'
    }
    axios(options)
=======
    this.getRecoName(this.props.id)
  }

  getRecoName(id){
    axios.get(Config.api.ROOT_URL+"/observation/getRecommendationVotes?format=json&id="+ id)
>>>>>>> a3a4a6af922593a75fcae135b4996808ff9b2eaf
        .then((response)=>{
          if(response.status === 200){
            this.setState({
              response:response.data[id]['recoVotes']
            });
          }
        })
  }

  agreePost(recoId,obvId,Votes){
    var obId=obvId;
    var recId=recoId;
    var votes=Votes;
    var agree1="agreeButton"+obId+recId;
    var remove1="removeButton"+obId+recId;
    //console.log(obId,recId)
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/api/observation/addAgreeRecommendationVote",
      params:{
        obvId:obvId,
        recoId:recId,
        currentVotes:votes
      },
      headers : AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("agree",response)
            this.getRecoName(this.props.id)
          })
          .catch((error)=>{
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
              })
            }else{
              console.log(error)
            }
          })
  }

  removePost(recoId,obvId,Votes){

    var token=localStorage.getItem('token')
    var obId=obvId;
    var recId=recoId;
    var votes=Votes;
    var agree1="agreeButton"+obId+recId;
    var remove1="removeButton"+obId+recId;
    //console.log(obId,recId)
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/api/observation/removeRecommendationVote",
      params:{
        obvId:obId,
        recoId:recId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("agree",response)
            if(response.status === 200){
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
              })
            }else{
              console.log(error)
            }
          })
  }

  validatePost(recoId,obvId){
    var token=localStorage.getItem('token')
    var obId=obvId;
    var recId=recoId;
    var validate1="validateButton"+obId+recId;
    var unlock1="unlockButton"+obId+recId;
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/api/observation/"+obId+"/lock",
      params:{
        lockType:"Validate",
        recoId:recId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("validate",response)
            if(response.status === 200){
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })

          }else console.log(error)
          })
  }

  unlockPost(recoId,obvId){
    var validate1="validateButton"+obvId+recoId;
    var unlock1="unlockButton"+obvId+recoId;
    var options={
      method: 'POST',
      url :   Config.api.ROOT_URL+"/api/observation/"+obId+"/lock",
      params:{
        lockType:"Unlock",
        recoId:recId
      },
      headers :AuthUtils.getAuthHeaders(),
      json: 'true'
    }
    axios(options)
          .then((response)=>{
            //console.log("validate",response)
            if(response.status === 200){
              this.getRecoName(this.props.id)
            }
          })
          .catch((error)=>{
            (error.response.status == 401)?
            (
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
            ):console.log(error)
          })
  }
  setGroupName(){
    let groupName=this.props.location.pathname.split("/")[2];
    let groupsyntax=this.props.location.pathname.split("/")[1];
    if(groupsyntax==="group"){
      this.setState({
        groupName
      })
    }
  }

  componentDidMount(){
      this.setGroupName();
  }


  render(){

    return(
    <div>
      {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getRecoName} id={this.props.id}/>):null}
      <div>{


      this.state.response.length>0?
      (
        this.state.response.map((item,index)=>{
          var authArray=[]
            return(
          <div key={index} className="well well-sm row " style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'0.2%'}}>
              <div className="dropdown col-sm-9 col-md-6 col-lg-9">
                {
                  item.isScientificName===true?
                    (
                      item.hasOwnProperty('speciesId')?
                      (
                          item.speciesId!=null?
                          (
                            this.state.groupName?
                              <NavLink to={`/group/${this.state.groupName}/species/show/${item.speciesId}`}>
                                <i>{item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:null}
                                {"    "}  </i></NavLink>

                                :<NavLink to={`/species/show/${item.speciesId}`}>
                                  <i>{item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:null}
                                {"    "}
                            </i></NavLink>
                          ):
                          (
                              <a>
                                <i>
                                    {item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:null}
                                    {"    "}
                                </i>
                             </a>
                          )
                      ):
                      (
                            <a>
                              <i>
                                  {item.hasOwnProperty('normalizedForm') ?<span style={{fontWeight:'bold'}}>{item.normalizedForm}</span>:(item.hasOwnProperty('name')?<span style={{fontWeight:'bold'}}>{item.name}</span>:null)}
                                  {"    "}
                              </i>
                           </a>
                      )
                  ):
                  (
                    <a >
                      <i>
                          {item.hasOwnProperty('name') ?<span style={{fontWeight:'bold'}}>{item.name}</span>:null}
                          {"    "}
                      </i>
                   </a>
                  )
                }
                {item.hasOwnProperty('commonNames')?<span style={{color:'black'}}>{item.commonNames}</span>:null}
                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="badge" style={{backgroudColor:'red'}}>{item.authors.length}</span></a>
                    <ul className="dropdown-menu row " style={{backgroundColor:'#99E0EE'}}>
                        {
                          item.authors.map((aut,index)=>{
                            authArray=authArray.concat(aut[0].id)
                            //console.log(authArray)
                            //console.log(localStorage.getItem('id'))
                            var a=localStorage.getItem('id')
                            //console.log(item.recoId,$.inArray(parseInt(a),authArray))
                              return(
                                <div key={index} className="col-sm-1">
                                <li >
                                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/user/show/${aut[0].id}`}>    <img className="small-profile-pic img-circle" title={aut[0].name}  src={aut[0].icon} width="30" height="30" />
                                  </NavLink>:<NavLink to={`/user/show/${aut[0].id}`}> <img className="small-profile-pic img-circle"  title={aut[0].name} src={aut[0].icon} width="30" height="30" /></NavLink>}
                                </li>
                                </div>
                              )
                            })
                      }
                    </ul>

               </div>
               <div className="col-sm-3 col-md-6 col-lg-3 ">
                  <div className="row pull-right">
                  <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4">
                  {
                    item.isLocked==false?
                    (



                          (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                            (
                                <button id={"validateBtn"+this.props.id+item.recoId} ref={"validateButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree" onClick={this.validatePost.bind(this,item.recoId,this.props.id)}>Validate</button>
                            ):
                            null


                    )
                    :
                    (


                          (AuthUtils.isLoggedIn() && (item.hasObvLockPerm || AuthUtils.isAdmin()))?
                            (
                               <button id={"unlockBtn"+this.props.id+item.recoId} ref={"unlockButton"+this.props.id+item.recoId} className="btn btn-danger btn-xs nameAgree" onClick={this.unlockPost.bind(this,item.recoId,this.props.id)}>Unlock</button>
                            ):
                            (
                              <span className="glyphicon glyphicon-lock tooltip-content" data-toggle="tooltip" title={"This species id islocked"}></span>
                            )

                    )
                  }
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4">
                  {
                    (AuthUtils.isLoggedIn())?
                        (
                          ($.inArray(parseInt(localStorage.getItem('id')),authArray))>=0?
                          (

                              item.isLocked==false?
                              (
                                <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree" onClick={this.removePost.bind(this,item.recoId,this.props.id,item.authors.length)}>Remove</button>
                              ):
                              (
                                <button id={"removeBtn"+this.props.id+item.recoId} ref={"removeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree" disabled>Remove</button>
                              )

                          )
                          :
                          (


                              item.isLocked==false?
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} >agree</button>
                              ):
                              (
                                <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "   disabled>agree</button>
                              )

                          )
                        )
                        :
                        (


                            item.isLocked===false?
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "  onClick={this.agreePost.bind(this,item.recoId,this.props.id,item.authors.length)} >agree</button>
                            ):
                            (
                              <button id={"agreeBtn"+this.props.id+item.recoId} ref={"agreeButton"+this.props.id+item.recoId} className="btn btn-primary btn-xs nameAgree "   disabled>agree</button>
                            )

                        )
                    }
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4">
                      <RecoComment key={item.recoId} getReco={this.getRecoName} id1={item.recoId} id2={this.props.id} speciesId={item.hasOwnProperty('speciesId')?(item.speciesId!=null?item.speciesId:"no"):"no"} name={item.name} votes={item.authors.length} commentCount={item.totalCommentCount}/>
                    </div >
                      </div>
                </div>
          </div>
        )}
        )
      )
      :null
    }
      </div>
      <div style={{marginTop:'1%'}}>
          {
            this.props.islocked==="false"?
            (
              <Formsuggest  id2={this.props.id} getReco={this.getRecoName}/>
            ):
            (
              <span style={{color:'green'}}>This species is locked by author</span>
            )

          }
      </div>
    </div>
    )
  }
}
function mapStateToProps(state){
return {
  Recommendations:state.Recommendations
};
}
export default  withRouter(connect(mapStateToProps, {fetchRecommendations})(RecoName));
