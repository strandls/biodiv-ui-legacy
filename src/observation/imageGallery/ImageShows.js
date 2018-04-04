import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Config} from '../../Config';
import createHistory from 'history/createBrowserHistory';
import style from './style.css';

export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            resource:[]
        };
    }
    getUrl(thumbnail,speciesGroup){

      let group=speciesGroup.toLowerCase();
      let groupIcon=null;
      groupIcon=Config.api.IBP_URL+'/biodiv/group_icons/speciesGroups/'+group+'_th1.png';

      let res = thumbnail?thumbnail.split("."):null;

      if(res){
        if(res[1]=="mp3" || res[1]=="wav"){
            return Config.api.IBP_URL+'/biodiv/assets/all/audioicon.png';
          }
          else if(res[0]=="v"){
            let url = this.props.videos[0];
            let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid != null) {
              let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
              return imageUrl
            }
          }
          else{
            return `${Config.api.IBP_URL}/biodiv/observations/`+res[0]+"_th1.jpg"
          }
        }
      else {
        return groupIcon
      }
    }
    render() {
      let images=[];
      this.props.images?this.props.images.map((data)=>{
        if(data=='v'){
        }
        else if(data.split(".")[1]==="mp3" || data.split(".")[1]==="wav" ){
          images.push(Config.api.IBP_URL+"/biodiv/assets/all/audioicon.png")
        }
        else{
          data=Config.api.IBP_URL+"/biodiv/observations/"+data;
           images.push(data);
        }

      }):null;
      this.props.videos?this.props.videos.map((data)=>{
          let url = data;
          let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          if(videoid != null) {
            let imageUrl="https://img.youtube.com/vi/"+videoid[1]+"/0.jpg";
            images.push(imageUrl);

          }
      }):null;
      const {photoIndex,isOpen} = this.state;
        return (
            <div>

              <div id="mycarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                        <NavLink to={`show/${this.props.objs.id}`} >
                    <img src={this.getUrl(this.props.thumbnail,this.props.speciesgroupname)} style={{height:'200px',width:'200px',borderRadius: '5px'}} className="media-object img-responsive img-rounded" />
                     </NavLink>
                    <div className="carousel-caption" >
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofimages}  <i className="fa fa-picture-o" aria-hidden="true"></i></strong>
                         {"           "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofaudio}  <i className="fa fa-file-audio-o" aria-hidden="true"></i></strong>
                         {"        "}
                         <strong onClick={() => this.setState({ isOpen: true })}>{this.props.objs.noofvideos}  <i className="fa fa-video-camera" aria-hidden="true"></i></strong>
                    </div>
                    {isOpen &&
                        <Lightbox
                            style={{marginTop:'50%'}}
                            clickOutsideToClose={true}
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}

                        />
                    }
                  </div>
                </div>
              </div>

            </div>
        );
    }
}
