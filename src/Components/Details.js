import React from 'react';
import axios from 'axios';
import '../styles/Details.css';
import queryString from 'query-string';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Carousel} from 'react-responsive-carousel';
import Header from './header';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height:'500px',
      backgroundColor:'greenyellow'
    }
  };


  const orderstyles = {
    content : {
    
        top                   : '45%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height:'500px',
        backgroundColor:'orangered'
    }
  };

  
  
class Details extends React.Component {
    constructor()
    {
        super();
        this.state={
            restaurant:{},
            gallerymodalIsOpen:false,
            isonlineorderopen:false,
            restaurantId:undefined,
            items:[],
            subTotal:0,
            paynowmodelisopen:false,
            firstname:undefined,
            lastname:undefined,
            password:undefined,
            email:undefined,
            gender:undefined,
            userdetails:[]
        }
    }



    componentDidMount()
    {
        const qs=queryString.parse(this.props.location.search);
        const resId=qs.restaurant;

        axios({
            url:`https://mysterious-reaches-60926.herokuapp.com/getRestaurantById/${resId}`,
            method:'GET',
            headers:{'content-Type':'application/json'}
        }) 
        .then(res=>this.setState({restaurant:res.data.restaurants, restaurantId:resId}))
        .catch(err=>console.log(err))


        
    
    }

   

    handleclick=(state,value)=>{
        const {restaurantId}=this.state;
      this.setState({[state]:value})
      if(state=='isonlineorderopen')
      {
         axios({
             url:`https://mysterious-reaches-60926.herokuapp.com/getrestauantbyitem/${restaurantId}`,
             method:'GET',
             headers:{'content-Type':'application/json'}
         })
         .then(res=>this.setState({items:res.data.items}))
         .catch(err=>console.log(err))
      }
    }


    add=(index,operationtype)=>{
let total=0;
const items=[...this.state.items];

const item=items[index]

if(operationtype=='add')
{
    item.qty=item.qty+1;
}
else{
    item.qty=item.qty-1;
}

 items[index]=item;

items.map((item)=>{
    total+=item.qty*item.price;
})
this.setState({items:items, subTotal:total})
    }


    paynow=(state,value)=>{

        this.setState({[state]:value,isonlineorderopen:false})
    }
    
    createradio=(gender)=>{
       this.setState({gender:gender})
    }

    


    firstname=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value})

    }

    lastname=(event)=>{
        let name=event.target.name;
       
        let value=event.target.value;
        this.setState({[name]:value})

    }

    password=(event)=>{
        let name=event.target.name;
       
        let value=event.target.value;
        this.setState({[name]:value})

    }

    email=(event)=>{
        let name=event.target.name;
       
        let value=event.target.value;

        this.setState({[name]:value})

    }

    
       
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`https://mysterious-reaches-60926.herokuapp.com/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    makePayment = (e) => {
        const { subTotal, email } = this.state;
        this.getData({ amount: subTotal, email: email }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information);
        })
        e.preventDefault();

        const {firstname,lastname,password,gender}=this.state;

        axios({
            url:'https://mysterious-reaches-60926.herokuapp.com/signup',
            method:'POST',
            headers:{'content-Type':'application/json'},
            data:
            {
                firstname:firstname,
                lastname:lastname,
                password:password,
                email:email,
                gender:gender
            }
        }).then(res=>this.setState({userdetails:res.data.signup}))

        .catch(err=>console.log(err))
    }

    
    render() {
        const {restaurant,gallerymodalIsOpen,isonlineorderopen,items,paynowmodelisopen,subTotal}=this.state;
        return (
           

            
            <div>
                 <Header/>
                
                <div>
                    <img src={`../${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="350" />
                    <button className="button" onClick={()=>this.handleclick('gallerymodalIsOpen', true)}>Click to see Image Gallery</button>
                </div>
                
                <div className="heading">{restaurant.name}</div>
                <button className="btn-order bg-success" onClick={()=>this.handleclick('isonlineorderopen', true)}>Place Online Order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            {restaurant && restaurant.cuisine?restaurant.cuisine.map((item)=>{
                                return   <div  className="value" style={{color:'darkslateblue',display:'inline-block'}}>{item.name}&nbsp;</div>
                            })
                            :null}
                           
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                        </div>
                    </div>
                
                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>
                
                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurant.contact_number}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value">{`${restaurant.city}, ${restaurant.locality}`}</div>
                
                        </div>
                    </div>
                
                </div>
                <Modal
           isOpen={gallerymodalIsOpen}
            style={customStyles}
        >
 
         <div>
             
             <div onClick={()=>this.handleclick('gallerymodalIsOpen', false)} style={{float:'right',fontSize:'35px',color:'red'}}>&times;</div> 
   <Carousel showThumbs={false} showIndicators={false}>
  

       {
           restaurant&&restaurant.thumb?restaurant.thumb.map((item)=>{
               return  <div>
               <img src={`../${item}`}/>
               
           </div>
           })
       :null}
  
               
   </Carousel>
   </div>
        </Modal>


        <Modal
        isOpen={isonlineorderopen}
            style={orderstyles}
            
    >
           
            <div onClick={()=>this.handleclick('isonlineorderopen', false)} style={{fontSize:'20px',color:'blue',textAlign:'right'}}>close</div>
            <div style={{fontSize:'30px', color:'darkslateblue',fontWeight:'bold',display:'inline-block'}}>{restaurant.name}</div>
                <button className="btn btn-danger btn-sm mt-3" style={{float:'right'}} onClick={()=>this.paynow('paynowmodelisopen',true)}>paynow</button>
                <div style={{fontSize:'20px',fontWeight:'bold',color:'green',fontStyle:'italic'}} className="mb-1">subTotal:{subTotal}</div>
            {
               
items.map((item,index)=>{
    
    return <div className="media border bg-white rounded mb-3 ">
         <img src={`../${item.image}`} width="100px" height="100px" className="rounded-circle align-self-center"/>
        <div className="media-body mr-3">
        <div className="items">{item.name}</div>
        <div className="items">&#8377;&nbsp;{item.price}</div>
        <div className="items">{item.description}</div>
        <div>
        {item.qty==0?<div><button onClick={()=>this.add(index,'add')} className="btn btn-outline-success">add</button></div>:<div><button onClick={()=>this.add(index,'subract')} className="btn btn-outline-success">-</button>{item.qty}<button onClick={()=>this.add(index,'add')} className="btn btn-outline-success">+</button></div>}
        </div>
       </div>
        </div>
        













        
})
            }
            
        </Modal>

        <Modal
isOpen={paynowmodelisopen}
style={customStyles}
>
<div style={{textAlign:'center',color:'lightsteelblue'}}>Payment Form</div>
    <div onClick={()=>this.paynow('paynowmodelisopen',false)} style={{float:'right',marginTop:'-49px',fontSize:'20px',fontStyle:'italic',color:'gold',marginRight:'-16px'}}>close</div>
    <form style={{border:'4px solid black',padding:'10px 10px 10px 20px'}} onSubmit={this.makePayment}>
       <i className="fas fa-user"></i>&nbsp;<input type="text"  name='firstname' onChange={this.firstname} required/><br/><br/>
       <i className="fas fa-user"></i>&nbsp;<input type="text"   name='lastname'  onChange={this.lastname} required/><br/><br/>
       <i className="fas fa-lock"></i>&nbsp;<input type="password"  name='password' onChange={this.password} required/><br/><br/>
       <i className="fas fa-envelope">&nbsp;</i><input type="email"   name='email' onChange={this.email} required/><br/><br/>
    <i className="fas fa-male"></i>&nbsp;&nbsp;<input type="radio" name='gender' required value="male" onChange={()=>this.createradio('male')}/>&nbsp;&nbsp;male&nbsp;&nbsp;
    <i className="fas fa-female"></i>&nbsp;&nbsp;<input type="radio" name='gender'  required onChange={()=>this.createradio('female')}/>&nbsp;&nbsp;female&nbsp;&nbsp;
        <input type="radio" name='gender'required onChange={()=>this.createradio('others')}/>&nbsp;&nbsp;others<br/>
        <button style={{marginLeft:'80px'}} className="btn btn-danger">proceed</button>

    </form>

</Modal>


       
            </div>
            
        )
    }
}

export default Details;