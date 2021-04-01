import './Skr.css';
function Sarath(){

        return(
		
			
            <div>
				
                <nav className="navbar navbar-expand-xs bg-dark navbar-dark p-3 fixed-top">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav"> 
	   <li className="nav-item">
        <a className="nav-link text-primary" href="https://sleepy-goldberg-913a89.netlify.app/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-primary" href="https://sleepy-goldberg-913a89.netlify.app/">About us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-primary" href="https://stupefied-spence-039649.netlify.app/">Contact us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-primary" href="https://silly-morse-309210.netlify.app/#">Rate us</a>
      </li>    
    </ul>
  </div>  
</nav>

<div id="demo" className="carousel slide" data-ride="carousel">

  <ul className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>




<div className="container-fluid jumbotron text-center" style={{background:"url(./images/restaurantlogo.jpg)"}}>
<marquee className="text-danger" style={{fontSize:"30px",fontWeight:"bold",fontStyle:"italic"}} direction="right">Welcome to Skr Restaurat</marquee>	
	<div className="logo">	
	<p className="skr">SKR <i className="fas fa-coffee bg-warning rounded" id="top"></i> <b>R</b>estaurant</p>
</div>
<br/><br/><br/>

<div className="btn btn-group">
	<a href="#" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Home</a>
	<div className="dropdown-menu">
		<a href="#" className="dropdown-item bg-dark text-white">products</a>
    <a href="#" className="dropdown-item bg-dark text-white">orders</a>
    <a href="#" className="dropdown-item bg-dark text-white">complaints</a>
	</div>
	<a href="https://brave-panini-3bcf44.netlify.app/" className="btn btn-primary" data-toggle="popover" title="SKR Restaurant" data-content="we have Variety of dishes" data-trigger="focus">Dishes</a>
	<a href="https://sleepy-goldberg-913a89.netlify.app/" className="btn btn-primary">About Us</a>
	<a href="https://git-contact-us.netlify.app/" className="btn btn-primary">Contact Us</a>
</div>
<br/><br/><br/>


<div style={{display: "inline-block"}} >
	<select className="dropdown">
		<option selected>Please select your location</option>
		<option>Delhi</option>
		<option>Mumbai</option>
		<option>Kolkata</option>
		<option>Ananthapur</option>
		<option>Vishkapatnam</option>
		<option>Vijaywada</option>
	</select>
	<input type="Search" className="search" name="search"  placeholder="Search your Favourite Restaurant"/>
</div>
<br/><br/><br/>


<div className="carousel-inner">
    <div className="carousel-item active">
      <img src="./Images/image1.png" alt="Los Angeles" width="300px" height="200px" className="rounded-circle  img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
      <div className="carousel-caption">
      	<p className="text-warning" style={{fontWeight: "bold"}}>BreakFast</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="./Images/image2.png" alt="Chicago" width="300px" height="200px" className="rounded-circle img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
       <div className="carousel-caption">
      	<p className="text-warning"  style={{fontWeight: "bold"}}>Lunch</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="./Images/image3.png" alt="New York" width="300px" height="200px" className="rounded-circle img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
       <div className="carousel-caption">
      	<p className="text-warning"  style={{fontWeight: "bold"}}>Snacks</p>
      </div>
    </div>
  </div>
  </div>
</div>

  <a className="carousel-control-prev" href="#demo" data-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="carousel-control-next-icon"></span>
  </a>

  <div className="quicksearches container-fluid">Quick Searches</div>
<div className="container-fluid">
	<div className="one rounded"  data-toggle="tooltip" title="Burgers  We have Variety of Burgers" data-placement="bottom">
		<div style={{display: "inline-block",width: "45%"}}>
			<img src="./images/burger.jpg" width="129px" height="149px"className="rounded-circle"/>
		</div>
		<div style={{display: "inline-block",width: "45%",verticalAlign: "top"}}>
			<div className="badge badge-dark rounded-circle" >1</div>
			<div className="burger">Burgers</div>
			<div className="two">We have Variety of Burgers</div>
		</div>

	</div>
	<div className="one rounded"  data-toggle="tooltip" title="Pizza's  We have Variety of Pizza's" data-placement="bottom">
		<div style={{display: "inline-block",width: "45%"}}>
			<img src="./images/pizza.jpg" width="129px" height="149px"className="rounded-circle"/>
		</div>
		<div style={{display: "inline-block",width: "45%",verticalAlign: "top"}}>
			<div className="badge badge-dark rounded-circle" >2</div>
			<div className="burger">Pizza's</div>
			<div className="two">We have Variety of Pizza's</div>
		</div>
	</div>
	<div className="one rounded"  data-toggle="tooltip" title="Chicken Dishes  We have Variety of Dishes" data-placement="bottom">
		<div style={{display: "inline-block",width: "45%"}}>
			<img src="./images/kfc.jpg" width="129px" height="149px" className="rounded-circle"/>
		</div>
		<div style={{display: "inline-block",width: "45%",verticalAlign: "top"}}>
			<div className="badge badge-dark rounded-circle" >3</div>
			<div className="burger">Chicken Dishes</div>
			<div className="two">We have Variety of Dishes</div>
		</div>
	</div>
</div>
<br/><br/>

<div className="footer container-fluid">SKR<i className="fas fa-coffee bg-success rounded-circle"></i> RESTAURANT</div>

<div className="container-fluid jumbotron text-center">
	
		<h3>This was published by Bujala Sarath Kumar Reddy</h3>
        <p><b>Give Your FeedBack:</b></p>
		<textarea rows="3" cols="23"></textarea><br/>
		<button className="btn btn-primary" onclick="sarath()">submit</button>
		<p>all &copy;rights &reg;eserved</p>

	<a href="https://sleepy-goldberg-913a89.netlify.app/">about us</a>
	<a href="https://git-contact-us.netlify.app/">contact us</a>
	<a href="https://silly-morse-309210.netlify.app/#">Rate us</a>
    <a href="#top">Goto Top</a>
	</div>
    <div className="footer1 bg-dark text-white">
	<div className="d-flex flex-row-reverse justify-content-center p-3">
		<p className="text-primary">Please follow us on <span className="fab fa-facebook"></span></p>&nbsp;
		<p className="text-primary"> Please follow us on <span className="fab fa-twitter"></span></p>

	</div>
</div>

</div>
            

        );
    
}

export default Sarath;