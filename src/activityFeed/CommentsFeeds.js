import axios from "axios";
import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import AuthUtils from "../auth/AuthUtils.js";
import ModalPopup from "../auth/Modal.js";
import { Config } from "../Config";
import RichTextEditor from "../util/richEditor/RichTextEditor.js";
import UserAvatar from "../util/userIcon";

var  abc= 'nrewurl';
class CommentsFeeds extends Component {
  constructor(props) {
    super(props);
    this.state={
      response:[],
      login_modal:false,
      options:'',
      value:'',
      remainingFeedCount:null,
      loading:false
    }
    this.semiFeeds=[];
    this.res=[];
    this.refTym='';
    this.fetchCount=0;
    this.currentHrefForUsergroup='';
    this.getGroupUrlById = this.getGroupUrlById.bind(this);
    this.fetchFeeds = this.fetchFeeds.bind(this);
  }

  componentDidMount(){
    this.fetchFeeds(this.props.id);
  }


  getUsers(query, callback){
    var userData
   console.log(query)
   console.log(callback)
   axios.get(Config.api.ROOT_URL+"/user/terms?term="+query+"&format=json")
       .then((response)=>{
         console.log("user response",response)
        let data1= response.data.map((user,index)=>{
            let data={}
           data.id=JSON.stringify(user.userId)
           data.display=user.value
           data.userpic=user.user_pic
           return data
         })
          userData=data1
          callback(userData)
       })
 }

 handleChange(e){
    this.setState({
        value: e.target.value
    })
 }

 fetchFeeds(id,first){
   //console.log("fetchFeeds calllllllllled",first)
   //console.log("sdhyfsfhyshs",this)
   //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
   document.body.style.cursor = "wait";
    var refTime;
    if(first === true)
    {
      this.setState({
        response:[]
      });
      console.log("inside fistr ttrue")
      console.log(this.fetchCount,this.state.response)
      this.fetchCount=0;
    }
    console.log("fetchcouint",this.fetchCount)
    if(this.fetchCount>0){
      refTime = this.refTym
    }else{
      var d = new Date();
      var tym = d.getTime();
      refTime = tym;
    }
    var feed1="feedbtn" + id
    var feedMore="moreFeedBtn"+id
    console.log("in the fecth feeds")
    var options={
      method:"GET",
      url: Config.api.API_ROOT_URL+"/activityFeed/feeds",
      params:{
        rootHolderId:id,
        rootHolderType:"species.participation.Observation",
        feedType:"specific",
        feedPermission:"editable",
        feedOrder:"oldestFirst",
        refrshType:"manual",
        timeLine:"older",
        refTime:refTime,
        max:2
      }
    }
    axios(options)
        .then((response)=>{
          //console.log(response.data)
        //  this.refs.hasOwnProperty(feed1)?(this.refs[feed1].style.display="none"):null
        //  this.refs.hasOwnProperty(feedMore)?(this.refs[feedMore].style.display="block"):null
          document.body.style.cursor = "default";
          if(response.data.remainingFeedCount ==0){
            if(this.refs.hasOwnProperty(feedMore)){this.refs[feedMore].style.display="none"}
          }else{
            if(this.refs.hasOwnProperty(feedMore)){this.refs[feedMore].style.display="block"}
          }
          if(response.data){

          this.semiFeeds=response.data.model.feeds
          this.semiFeeds=this.semiFeeds.concat(this.state.response)
          this.setState({
            response:this.semiFeeds,
            remainingFeedCount:response.data.remainingFeedCount
          })
          this.refTym = response.data.olderTimeRef
          this.fetchCount++
         }
        })
  }

  commentPost(e){
    e.preventDefault();
    var id1=this.props.id;
    var obvComment1="obvComment"+this.props.id
    if(this.refs[obvComment1]){console.log("tag*************************************************",this.refs[obvComment1])}
    // var value1=this.refs[obvComment1].props.value
    // var d = new Date();
    // var tym = d.getTime();
    // var options={
    //   method:'POST',
    //   url :   Config.api.ROOT_URL+"/api/comment/addComment?commentHolderId="+id1+"&commentHolderType=species.participation.Observation&rootHolderId="+id1+"&rootHolderType=species.participation.Observation&commentBody="+value1+"&newerTimeRef="+tym,
    //   headers : AuthUtils.getAuthHeaders(),
    //   json: 'true'
    // }
    // if(value1!=="")
    // {
    // this.setState({
    //   value:''
    // })
    // axios(options)
    //     .then((response)=>{
    //       console.log("comment",response)
    //     })
    //     .catch((response)=>{
    //       (response=="Error: Request failed with status code 401")?
    //       (
    //         this.setState({
    //         login_modal:!(this.state.login_modal),
    //         options:options
    //       })
    //
    //       ):console.log("fofoofof")
    //     })
    //   }

  }

  replyOnComment(id){
    var rep = "Reply"+id;
    var canRep ="CancelReply"+id
    var box = "Replybox"+id;
    var box2 = "Editbox"+id;
    var edit = "Edit"+id;
    var del = "Delete"+id;
    //var postBtn = "Replypost"+id
    if(this.refs.hasOwnProperty(rep)){this.refs[rep].style.display="none"}
    if(this.refs.hasOwnProperty(edit)){this.refs[edit].style.display="none"}
    if(this.refs.hasOwnProperty(del)){this.refs[del].style.display="none"}
    if(this.refs.hasOwnProperty(canRep)){this.refs[canRep].style.display="block"}
    if(this.refs.hasOwnProperty(box2)){this.refs[box2].style.display="none"}
    if(this.refs.hasOwnProperty(box)){this.refs[box].style.display="block"}
    //this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="block"):null
  }

  editOnComment(id){
    var del = "Delete"+id;
    var rep = "Reply"+id;
    var edit = "Edit"+id;
    var box = "Replybox"+id;
    var box2 = "Editbox"+id;
    var canEdit ="CancelEdit"+id;
    if(this.refs.hasOwnProperty(edit)){this.refs[edit].style.display="none"}
    if(this.refs.hasOwnProperty(rep)){this.refs[rep].style.display="none"}
    if(this.refs.hasOwnProperty(del)){this.refs[del].style.display="none"}
    if(this.refs.hasOwnProperty(canEdit)){this.refs[canEdit].style.display="block"}
    if(this.refs.hasOwnProperty(box2)){this.refs[box2].style.display="block"}
    if(this.refs.hasOwnProperty(box)){this.refs[box].style.display="none"}
  }

  deleteOnComment(id){
    //console.log("deleteonCommmmmmmmmmmment",id)
    document.body.style.cursor = "wait";
    var options={
       method:'POST',
       url :   Config.api.API_ROOT_URL+"/comment/removeComment?commentId="+id,
       headers : AuthUtils.getAuthHeaders(),
       json: 'true'
     }
     axios(options)
         .then((response)=>{
           //console.log("comment",response)
           //console.log(this.props.fetchFeeds)
           document.body.style.cursor = "default";
           this.fetchFeeds(this.props.id,true);
         })
          .catch((error)=>{
            document.body.style.cursor = "default";
            if(error.response.status == 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
          }else{
            console.log(error.response.statusText)
          }
          })
  }

  cancelReplyOnComment(item){
    var rep = "Reply"+item.id;
    var box = "Replybox"+item.id;
    var box2 = "Editbox"+item.id;
    var canRep ="CancelReply"+item.id;
    var edit = "Edit"+item.id;
    var del = "Delete"+item.id;
    //var postBtn = "Replypost"+id
    if(this.refs.hasOwnProperty(canRep)){this.refs[canRep].style.display="none"}
    if(this.refs.hasOwnProperty(rep)){this.refs[rep].style.display="block"}

    if(AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id){
      if(this.refs.hasOwnProperty(edit)){this.refs[edit].style.display="block"}
      if(this.refs.hasOwnProperty(del)){this.refs[del].style.display="block"}
    }
    if(this.refs.hasOwnProperty(box2)){this.refs[box2].style.display="none"}
    if(this.refs.hasOwnProperty(box)){this.refs[box].style.display="none"}
    //this.refs.hasOwnProperty(postBtn)?(this.refs[postBtn].style.display="none"):null
  }

  cancelEditOnComment(item){
    var rep = "Reply"+item.id;
    var box = "Replybox"+item.id;
    var box2 = "Editbox"+item.id;
    var canEdit ="CancelEdit"+item.id;
    var edit = "Edit"+item.id;
    var del = "Delete"+item.id;
    if(this.refs.hasOwnProperty(canEdit)){this.refs[canEdit].style.display="none"}
    if(this.refs.hasOwnProperty(rep)){this.refs[rep].style.display="block"}

    if(AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id){
      if(this.refs.hasOwnProperty(edit)){this.refs[edit].style.display="block"}
      if(this.refs.hasOwnProperty(del)){this.refs[del].style.display="block"}
    }
    if(this.refs.hasOwnProperty(box2)){this.refs[box2].style.display="none"}
    if(this.refs.hasOwnProperty(box)){this.refs[box].style.display="none"}
  }

  getGroupUrlById(groupId){
    var url = '';
    if(this.props.UserGroupList)
    {
      if(this.props.UserGroupList.length>0){

        for(var i =0 ;i<this.props.UserGroupList.length;i++){
            if(this.props.UserGroupList[i].id==groupId){
              if(this.props.UserGroupList[i].domainName !== null){
                url = this.props.UserGroupList[i].domainName;
                break;
              }else{
                url= Config.api.ROOT_URL+"/group/"+this.props.UserGroupList[i].webaddress+"/show";
               break;
              }
            }
        }
          return url;
      }
    }

  }

  displayTransform(id,display,type){
    console.log("tetsing mentions input",id)
    console.log("testing display",display)
    console.log("testing type",type)
    //var ids = ${id};
    //var displays = ${display}
    var ids = id.toString();
    var displays = display.toString();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",ids)
    //var test =
    console.log("***********************************",<a href={Config.api.ROOT_URL+"/user/show/"+id}>{display}</a>)
    var url = Config.api.ROOT_URL+"/user/show"+id
    var ht = "<a "+"href='"+url+"' >"+display+"</a>";
    console.log("9999999999999999999999999999999",ht)
    return display;
  }

  renderSuggestion(entry,search, highlightedDisplay, index){
    console.log("testing entry",entry)
    console.log("testing search",search)
    console.log("testing highlightedDisplay",highlightedDisplay)
    console.log("testing index",index)
    return (
            <div className="row">
                <span className="col-sm-4"><img src={entry.userpic} height='40px' width='40px'/></span>
                <span className="col-sm-8"><b><h5><a href={Config.api.ROOT_URL+"/user/show/"+entry.id}>{entry.display}</a></h5></b></span>
            </div>
          )
  }


  render(){
    return(
      <div style={{marginTop:'1%'}}>
      {this.state.login_modal===true?(<ModalPopup key={this.state.options} options={this.state.options} />):null}
      {this.state.loading ===true?<div className="loading"></div>:
      (
      <div className=" union-comment" id={this.props.id+"_comments"} >
          <div className="activityfeed activityfeedSpecific" >
                <div className="row" style={{marginLeft:'2%'}}>
                    <a className="activiyfeednewermsg " style={{display:'block'}}  title="load new feeds" ref={"moreFeedBtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>{this.props.LocaleData['link.show']+" "+this.state.remainingFeedCount+ " "+this.props.LocaleData['showallactivityfeed.older.feeds']}</a>
                    {/*<a className="activiyfeedoldermsg " style={{display:'block'}} title="show feeds" ref={"feedbtn"+this.props.id} onClick={this.fetchFeeds.bind(this,this.props.id)}>Show  older feeds </a>*/}
                </div>
                <div className="pre-scrollable" id={this.props.id+"feedlist"} style={{width:'99%',marginLeft:'0.5%',marginTop:'0.2%',marginBottom:'2%'}}>
                    {
                      this.state.response?(
                        this.state.response.length>0?(
                        this.state.response.map((item,index)=>{
                          return(
                                <div key={index} className="activityFeed-Container row well well-sm" style={{marginLeft:'0.1%',marginTop:'0.2%',marginBottom:'0.2%',marginRight:'0.1%'}}>

                                          <div  className="author-icon col-sm-1">
                                          {

                                              <NavLink to={`/${this.props.PublicUrl}user/show/${item.author.id}`}>
                                                {
                                                  item.author.icon?
                                                  (
                                                    <UserAvatar  name={item.author.name} title={item.author.name} src={Config.api.ROOT_URL+"/biodiv/users/"+item.author.icon}  size="30" />
                                                  )
                                                  :
                                                  (
                                                    <UserAvatar  name={item.author.name} title={item.author.name}   size="30" />
                                                  )
                                                }
                                              </NavLink>
                                          }
                                          </div>
                                          {
                                            (item.activityType == 'Suggested species name' || item.activityType == 'obv unlocked' || item.activityType == 'obv locked' ||
                                            item.activityType == 'Agreed on species name' || item.activityType == 'Suggestion removed')?
                                            (
                                              <div className="feed col-sm-11" >
                                                  <div className="row">
                                                    <b>
                                                        {item.author.name}   :
                                                        <span className="yj-context text-success">  {this.props.LocaleData[item.descriptionJson.activity_performed] + ' '}
                                                            {
                                                              (item.descriptionJson.name && item.descriptionJson.ro_id)?
                                                              (
                                                                item.descriptionJson.is_scientific_name?
                                                                (
                                                                  <a href={Config.api.IBP_URL+"/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                                      <i>{item.descriptionJson.name}</i>
                                                                  </a>
                                                                )
                                                                :
                                                                (
                                                                  <a href={Config.api.IBP_URL+"/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                                    {item.descriptionJson.name}
                                                                  </a>
                                                                )
                                                              )
                                                              :
                                                              (
                                                                item.descriptionJson.description?
                                                                (
                                                                  <span className="parse" dangerouslySetInnerHTML={{ __html: item.descriptionJson.description }} />
                                                                )
                                                                :
                                                                (
                                                                  item.descriptionJson.name?
                                                                  (
                                                                    item.descriptionJson.is_scientific_name?
                                                                    (
                                                                      <i style={{color:'#337ab7'}}>{item.descriptionJson.name}</i>
                                                                    )
                                                                    :
                                                                    (
                                                                      <span style={{color:'#337ab7'}}>{item.descriptionJson.name}</span>
                                                                    )
                                                                  ):null
                                                                )
                                                              )
                                                            }
                                                        </span>
                                                    </b>
                                                    <span>
                                                    {
                                                      ((new Date().getTime() - item.lastUpdated) >= 86400000)?(
                                                        <b>
                                                         {" : On "}
                                                        </b>
                                                      ):(
                                                        <b>
                                                         {" : About "}
                                                        </b>
                                                      )
                                                    }

                                                    {
                                                      ((new Date().getTime() - item.lastUpdated) >= 86400000)?(
                                                        <Moment format="MMMM DD, YYYY" fromNow>{new Date(item.lastUpdated)}</Moment>
                                                        ):(
                                                        <Moment fromNow>{new Date(item.lastUpdated)}</Moment>
                                                      )
                                                    }
                                                    </span>
                                                  </div>
                                                  {
                                                    item.activityType != 'Suggestion removed'?
                                                    (
                                                      item.descriptionJson.description?
                                                      (
                                                        <div className = "description row" style={{color:'#3B2F2F'}}>
                                                            <span className="parse" dangerouslySetInnerHTML={{ __html: "Given name: "+item.descriptionJson.description }} />
                                                        </div>
                                                      ):null
                                                    ):null
                                                  }
                                                  {/*<div className="row" style={{marginTop:'1%'}}>
                                                          <time className="timeago"><Moment date={item.lastUpdated}/></time>
                                                  </div>*/}
                                              </div>
                                            )
                                            :
                                            (
                                              <div className="feed col-sm-11" >
                                                  <div className="row">
                                                    <b>
                                                        {item.author.name}   :
                                                        <span className="yj-context text-success">  {this.props.LocaleData['item.descriptionJson.activity_performed'] + ' '}
                                                        {
                                                          item.descriptionJson.ro_type === "userGroup"?
                                                          (
                                                            <a href={this.getGroupUrlById(item.descriptionJson.ro_id)}>
                                                            {item.descriptionJson.name}
                                                            </a>
                                                          ):
                                                          (
                                                            <a href={Config.api.IBP_URL+"/"+item.descriptionJson.ro_type+"/show/"+item.descriptionJson.ro_id}>
                                                            {item.descriptionJson.name}
                                                            </a>
                                                          )
                                                        }

                                                        </span>

                                                    </b>
                                                    <span>
                                                    {
                                                      ((new Date().getTime() - item.lastUpdated) >= 86400000)?
                                                      (
                                                        <b>
                                                         {" : On "}
                                                        </b>
                                                      ):(
                                                        <b>
                                                         {" : About "}
                                                        </b>
                                                      )
                                                    }
                                                    {
                                                      ((new Date().getTime() - item.lastUpdated) >= 86400000)?
                                                      (
                                                        <Moment format="MMMM DD, YYYY" fromNow>{new Date(item.lastUpdated)}</Moment>
                                                      ):(
                                                        <Moment fromNow>{new Date(item.lastUpdated)}</Moment>
                                                      )
                                                    }
                                                    </span>
                                                  </div>
                                                  <div className = "description row" style={{color:'#3B2F2F'}}>
                                                      <span className="parse" style={{wordWrap:'break-word'}} dangerouslySetInnerHTML={{ __html: item.descriptionJson.description }} />
                                                  </div>
                                                  {/*<div className="row" style={{marginTop:'1%'}}>
                                                      <time className="timeago"><Moment date={item.lastUpdated}/></time>
                                                  </div>*/}
                                                  {
                                                    (item.descriptionJson.activity_performed == 'Added a comment' || item.descriptionJson.activity_performed == 'In reply to')?
                                                    (
                                                      <div>
                                                      <div className="row">
                                                          <a  className="col-xs-2" style={{display:'block'}} ref={"Reply"+item.id} onClick={this.replyOnComment.bind(this,item.id)}>Reply</a>
                                                          <a  className="col-xs-2" style={{display:'none'}} ref={"CancelReply"+item.id} onClick={this.cancelReplyOnComment.bind(this,item)}>Cancel</a>
                                                          {
                                                            (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                            (
                                                              <a  className="col-xs-2" style={{display:'block'}} ref={"Edit"+item.id} onClick={this.editOnComment.bind(this,item.id)}>Edit</a>

                                                            ):null
                                                          }
                                                          <a  className="col-xs-2" style={{display:'none'}} ref={"CancelEdit"+item.id} onClick={this.cancelEditOnComment.bind(this,item)}>Cancel</a>
                                                          {
                                                            (AuthUtils.isLoggedIn() && item.author.id==AuthUtils.getLoggedInUser().id)?
                                                            (
                                                              <a  className="col-xs-2" style={{display:'block'}} ref={"Delete"+item.id} onClick={this.deleteOnComment.bind(this,item.activityHolderId)}>Delete</a>
                                                            ):null
                                                          }
                                                      </div>
                                                      <div className="row">
                                                          <div className="col-sm-12" style={{display:'none'}} ref={"Replybox"+item.id}>
                                                              <RichTextEditor ref={"replyOnComment"+this.props.id} key={"richtextReply"+this.props.id}

                                                                          parentCommentId={item.activityHolderId}
                                                                          getFeeds={this.fetchFeeds}
                                                                          obvId={this.props.id}
                                                                          chId={this.props.id}
                                                                          PublicUrl={this.props.PublicUrl}
                                                              />
                                                          </div>
                                                          <div className="col-sm-12" style={{display:'none'}} ref={"Editbox"+item.id}>
                                                              <RichTextEditor ref={"editOnComment"+this.props.id} key={"richtextEdit"+this.props.id}
                                                                          htm={item.descriptionJson.description}
                                                                          //htm={'Thanks <a class="red tagUsers" contenteditable="false" href="http://indiabiodiversity.org/user/show/2920" rel="2920" target="_blank">Muthu Karthick</a> for the ID http://localhost:3000/observation/list?count=0&hasMore=true&max=10&offset=0&sort=lastRevised'}
                                                                          currentCommentId={item.activityHolderId}
                                                                          getFeeds={this.fetchFeeds}
                                                                          obvId={this.props.id}
                                                                          chId={this.props.id}
                                                                          PublicUrl={this.props.PublicUrl}
                                                              />
                                                          </div>
                                                      </div>
                                                      </div>
                                                    ):null
                                                  }
                                              </div>
                                            )
                                          }

                                </div>

                          )
                        })
                      ):null
                    ):null
                    }
                </div>
          </div>
     </div>
      )
    }


    </div>
    )
  }
}
//export default CommentsFeeds;
function mapStateToProps(state){
return {UserGroupList:state.UserGroupList,PublicUrl:state.PublicUrl.url,LocaleData:state.LocaleData};
}

function mapDispatchToProps(dispatch){
  return null;
}

 export default connect(mapStateToProps)(CommentsFeeds);
