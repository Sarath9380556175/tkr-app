import React from 'react';
import '../styles/Home.css';
import Header from './header';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class Wallpaper extends React.Component{
constructor()
{
    super();
    this.state={
    
        filter:[]
    }
}

    handlechange=(Event)=>{
const location=Event.target.value;

sessionStorage.setItem('locationId', location);

     

    axios({
        url:'https://mysterious-reaches-60926.herokuapp.com/homefilter',
        method:'POST',
        headers:{'content-Type':'application/json'},
        data:
        {
            location:location
        }
    })
    .then(res=>this.setState({filter:res.data.filter}))
    .catch(err=>console.log(err))
 }

 homefilter=(event)=>{
     const id=event.target.value;
   this.props.history.push(`/details/?restaurant=${id}`)
 }

    render()
    {
        const {locations}=this.props;
        const {filter}=this.state;
        return(
          <div>
              <Header/>
          <div className="float-right" style={{display: "inline-block",marginRight:"33px"}}>
		<a href="#" className="text-white">Login</a>
		<a href="#" className="text-white">Create an account</a>
	</div>

    <div className="container-fluid">
<div className="jumbotron text-center" style={{background: "url(./images/image0.png)",height: "400px"}}>
	<span className="mx-auto d-block" style={{display: "inline-block"}} className="logs">e!</span>
<div className="text pushpa">Find the best restaurants, cafés, and bars</div>
    <div className="pt-3">
	<select className="dropbox" onChange={this.handlechange} style={{marginRight:'5px'}}>
		<option style={{fontFamily:"serif",fontStyle: "italic"}} selected>Select your Location</option>
        {
        locations.map((item)=>{
            return <option value={item.location_id} style={{color:'green'}}>{`${item.name}, ${item.city}`}</option>
        })
        }

	</select>


    <select  className="dropbox" onChange={this.homefilter}>
       <option>Select Your Favourite Restaurant</option>
{
    filter&& filter.length!=0? filter.map((item)=>{
        return <option value={item._id} style={{color:'blue'}}>{item.name}</option>
       
    })
:null}
</select>
	
</div>
</div>
</div>
          </div>
        );
    }
}

export default  withRouter(Wallpaper);