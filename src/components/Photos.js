import React, { Component } from 'react'
import { connect } from "react-redux";
import { getPhotos } from "./store/actions/allActions"

class Photos extends Component {
    
    state = {
        loading: true, 
    }

    componentDidMount() {
        this.props.getPhotos(this.props.match.params.page);
    }
    UNSAFE_componentWillUpdate(){
        if(this.state.loading === true){
            this.setState({
                loading: false
            })
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location){
            this.props.getPhotos(this.props.match.params.page);
        }  
      }


      handleClickNext = (e) => {
        e.preventDefault();
        let num = parseInt(this.props.match.params.page);
        if(num < 3){
            num += 1;
            num.toString();
            this.props.history.push("/photos/" + num);
            this.setState({
                loading: true
            })
        }
      }

      handleClickPrev = (e) => {
        e.preventDefault();
        let num = parseInt(this.props.match.params.page);
        if(num>1){
            num -= 1;
            num.toString();
            this.props.history.push("/photos/" + num);
            this.setState({
                loading: true
            })
        }
      }
    
      render() {
        const photosArr = this.props.photos.map(url => {
            return (
                <img key={Math.random()*10000} className="ins-photo" src={url} alt=""/>
            )
        })
        
        if(this.state.loading === true) { 
            return (
                <div className="posts">
                  <div className="lds-dual-ring"></div>
                </div>   
            )
        }else {
            return (
                <div className="ins-container">
                    <p className="disclaimer card-title"><strong>Disclaimer: </strong>I do not own any of the photos. They are just the photos I liked on the internet. All credits to the talented creators.</p>
                    {photosArr}
                    <div className="btn-container">
                        <button className="btn-previous" onClick={this.handleClickPrev}>PREVIOUS</button>
                        <button className="btn-next" onClick={this.handleClickNext}>NEXT</button>
                    </div>     
                </div>
            )
        }
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.photos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: (page) => {dispatch(getPhotos(page))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Photos);
