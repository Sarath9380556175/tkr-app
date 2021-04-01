import React from 'react';
import '../styles/Header.css';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import InstagramLogin from 'react-instagram-login';
 
import axios from 'axios';
 


const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border:'10px double yellowgreen',
      backgroundColor:'orangered'
    }
  };

  const facebook = {
    content : {
      top                   : '30%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border:'4px solid green',
      backgroundColor:'orangered',
      width:'10px'
    }
  };
class Header extends React.Component{
    constructor()
    {
        super();
        this.state={
           
            login:false,
            isfacebookUserLoggedIn:false,
            username:undefined,
            image:undefined,
            ismodalopen:false,
            firstname:undefined,
            lastname:undefined,
            email:undefined,
            password:undefined,
            gender:undefined,
            registeredusers:[],
            normallogin:false,
            emailid:undefined,
            passwordid:undefined,
            logindetails:[],
            isLoggedIn:false,
            message:undefined,
            sarath:undefined,
            isgoogleUserLoggedIn:false,
            gusername:undefined
          
        }
    }

    
    handleClick=()=>{
        this.props.history.push('/')
    }

    
    signup=(state,value)=>{
this.setState({[state]:value, ismodalopen:false})

    }

    responseGoogle=(response)=>{
       sessionStorage.setItem('gusername',response.profileObj.name)
       const gusernames=sessionStorage.getItem('gusername')
        console.log(response)
        if(response && response.profileObj && response.profileObj.name)
        {
    this.setState({login:false,isgoogleUserLoggedIn:true,image:response.profileObj.imageUrl,username:response.name,gusername:gusernames})
        }
        else{
            this.setState({login:false})
        }
    }

    logout=(state,value)=>{
   this.setState({[state]:value,username:undefined, logindetails:[] , image:undefined})
    }

    responseFacebook=(response)=>{
        if(response && response.name)
        {
            sessionStorage.setItem('fusername',response.name)
            var facebookusername=sessionStorage.getItem('fusername')
  this.setState({login:false, isfacebookUserLoggedIn:true,username:facebookusername,image:response.picture.data.url})
        }
        else{
            this.setState({login:false})
        }

       

    }

    

    
createaccount =(state,value)=>{
    
        this.setState({[state]:value,login:false})
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
       console.log(name)
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



    submit=()=>
    { 

        const {firstname,lastname,password,email,gender}=this.state;

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
        }).then(res=>this.setState({registeredusers:res.data.signup}))

        .catch(err=>console.log(err))
    }


    normallogin=(state,value)=>{
        this.setState({[state]:value, login:false,ismodalopen:false} )

    }

   


    

    mailId=(event)=>{
        const name=event.target.name;

        console.log(name);
        const value=event.target.value;
        console.log(value);
   this.setState({[name]:value})
    }



    Password=(event)=>{
        const name=event.target.name;
        console.log(name);
        const value=event.target.value;
         console.log(value);
   this.setState({[name]:value})
    }
    
    responseInstagram=(responses)=>{
console.log(responses);
    }


    genderid=(gender)=>{
    
 const {emailid,passwordid,isLoggedIn,logindetails,message}=this.state;

 


 axios({
     url:'https://mysterious-reaches-60926.herokuapp.com/login',
     method:'POST',
     headers:{'content-Type':'application/json'},
     data:{
 email:emailid,
 password:passwordid,
 gender:gender
     }
 }).then(res=>this.setState({logindetails:res.data.user ,normallogin:false,isLoggedIn:res.data.IsLoggedIn, message:res.data.message,sarath:res.data.user==0?alert('Invalid Details'):alert('UserLoggedIn Successfully')}))

 .catch(err=>console.log(err))


   }

   


    
    render()
    {

        const {gusername, login,username,isfacebookUserLoggedIn,image,ismodalopen,normallogin,logindetails,isLoggedIn,message,isgoogleUserLoggedIn}=this.state;
        return(
        
            <div>
              


               
   

        




               


{ isfacebookUserLoggedIn==true? <div style={{backgroundColor:'#ce0505',height:'50px',paddingTop:'3px'}} className="fixed-top">
               
               <div className=" pt-2 bg-white logo" style={{display:'inline-block',marginLeft:'37px'}} onClick={this.handleClick}><img src={image} className="rounded-circle" style={{marginTop:'-11px',marginRight:'1px',width:'49px'}}/></div>
               <div style={{display:'inline-block',float:'right'}} className="account mr-3 ml-3 rounded btn-outline-success">
                   <div onClick={()=>this.logout('isfacebookUserLoggedIn',false)}>logout</div>
               </div>
               <div style={{display:'inline-block',float:'right'}} className="login pt-2" >{`Welcome ${username}`}</div>
       
           </div>
               
               

          
         
           : isLoggedIn==true && logindetails.length!=0 ? logindetails.map((item)=>{
            return  <div style={{backgroundColor:'#ce0505',height:'50px',paddingTop:'3px'}} className="fixed-top">
       
            <div className=" pt-2 bg-white logo" style={{display:'inline-block',marginLeft:'37px'}} onClick={this.handleClick}>e!</div>
            <div style={{display:'inline-block',float:'right'}} className="account mr-3 ml-3 rounded btn-outline-success">
                <div onClick={()=>this.logout('isUserLoggedIn',false)}>logout</div>
            </div>
            <div style={{display:'inline-block',float:'right'}} className="login pt-2" >{`Welcome ${item.firstname} ${item.lastname}`}</div>
    
        </div>
            
            })

            :isgoogleUserLoggedIn==true? <div style={{backgroundColor:'#ce0505',height:'50px',paddingTop:'3px'}} className="fixed-top">
               
            <div className=" pt-2 bg-white logo" style={{display:'inline-block',marginLeft:'37px'}} onClick={this.handleClick}><img src={image} className="rounded-circle" style={{marginTop:'-11px',marginRight:'1px',width:'49px'}}/></div>
            <div style={{display:'inline-block',float:'right'}} className="account mr-3 ml-3 rounded btn-outline-success">
                <div onClick={()=>this.logout('isgoogleUserLoggedIn',false)}>logout</div>
            </div>
            <div style={{display:'inline-block',float:'right'}} className="login pt-2" >{`Welcome ${gusername}`}</div>
    
        </div>
    

         : isLoggedIn==false || isfacebookUserLoggedIn==false? <div style={{backgroundColor:'#ce0505',height:'50px',paddingTop:'3px'}} className="fixed-top">
         <div className=" pt-2 bg-white logo" style={{display:'inline-block',marginLeft:'37px'}} onClick={this.handleClick}>e!</div>
         <div style={{display:'inline-block',float:'right'}} className="account mr-3 ml-3 rounded ">
             <div onClick={()=>this.createaccount('ismodalopen',true)}>createanaccount</div>
         
             
         </div>
         <div style={{display:'inline-block',float:'right'}} className="login pt-2" onClick={()=>this.signup('login',true)}>login</div>
        
     </div> 

    
           
    :null}



        

               
              
               
               
                
                



              



              
<Modal 
isOpen={login}
style={customStyles}
>
<div>
<GoogleLogin
    clientId="336603315194-enmhbif41n6sh912oab9degu8ptt0q3h.apps.googleusercontent.com"
    buttonText="Continue With Gmail"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  <br/><br/>
   <FacebookLogin
   style={facebook}
    appId="790203291581901"
    fields="name,email,picture"
    callback={this.responseFacebook} /><br/><br/>
    <button onClick={()=>this.normallogin('normallogin',true)} className="btn btn-success">Login With Credentials</button><br/><br/>
    <InstagramLogin
    clientId="1547572752116147"
    buttonText="Login With Instagram"
    onSuccess={this.responseInstagram}
    onFailure={this.responseInstagram}
  />
 <br/>
 <br/>

 <span>Don't have an account?</span><a href="#" onClick={()=>this.createaccount('ismodalopen',true)} style={{textDecoration:'none',color:'white'}}>&nbsp;signup</a>
<br/>
<br/>
</div> 
</Modal>

<Modal
isOpen={normallogin}
style={customStyles}
>
    <div className="text-center">
    <div onClick={()=>this.normallogin('normallogin',false)} style={{float:'right'}}>close</div>
    <div style={{marginBottom:'10px',textAlign:'center',color:'dodgerblue'}}>Login</div>



    <form onSubmit={this.loginform}>
       <i className="fas fa-envelope"></i> <input type="email" name='emailid' onChange={this.mailId} required/><br/><br/>
       <i className="fas fa-lock"></i>&nbsp;<input type="password" name='passwordid' onChange={this.Password} required/><br/><br/>
        Gender: <i className="fas fa-male"></i><input type="radio" name="gender"  onChange={()=>this.genderid('male')} required/>&nbsp;&nbsp;male&nbsp;
        <i className="fas fa-female"></i><input type="radio" name="gender"  onChange={()=>this.genderid('female')} required/>&nbsp;&nbsp;female&nbsp;
        <i className="fas fa-female"></i><input type="radio" name="gender"  onChange={()=>this.genderid('others')} required/>&nbsp;&nbsp;others<br/><br/>
       <button className="btn btn-primary">submit</button>
    </form>
    </div>
</Modal>

<Modal
isOpen={ismodalopen}
style={customStyles}>
    <marquee direction="right"><div style={{textAlign:'center',color:'darkslateblue'}}>Signup Form</div></marquee>
    <div onClick={()=>this.createaccount('ismodalopen',false)} style={{float:'right',marginTop:'-49px',fontSize:'20px',fontStyle:'italic',color:'gold',marginRight:'-16px'}}>close</div>
    <form style={{border:'4px solid black',padding:'10px 10px 10px 20px'}} onSubmit={this.submit}>
       <i className="fas fa-user"></i>&nbsp;<input type="text"  name='firstname' onChange={this.firstname} required/><br/><br/>
       <i className="fas fa-user"></i>&nbsp;<input type="text"   name='lastname'  onChange={this.lastname} required/><br/><br/>
       <i className="fas fa-lock"></i>&nbsp;<input type="password"  name='password' onChange={this.password} required/><br/><br/>
       <i className="fas fa-envelope">&nbsp;</i><input type="email"   name='email' onChange={this.email} required/><br/><br/>
    <i className="fas fa-male"></i>&nbsp;&nbsp;<input type="radio" name='gender' required value="male" onChange={()=>this.createradio('male')}/>&nbsp;&nbsp;male&nbsp;&nbsp;
    <i className="fas fa-female"></i>&nbsp;&nbsp;<input type="radio" name='gender'  required onChange={()=>this.createradio('female')}/>&nbsp;&nbsp;female&nbsp;&nbsp;
        <input type="radio" name='gender'required onChange={()=>this.createradio('others')}/>&nbsp;&nbsp;others<br/>
        <button style={{marginLeft:'80px'}} className="btn btn-primary">submit</button>
        <div>Already have an Account<a href="#" onClick={()=>this.normallogin('normallogin',true)} style={{color:'white',textDecoration:'none'}}>&nbsp;SignIn</a></div>

    </form>
</Modal>
                </div>
                

        
        )
    }
}

export default withRouter(Header);