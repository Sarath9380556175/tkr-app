import React from 'react';
import '../styles/Filter.css';
import axios from 'axios';
import qString from 'query-string';
import Header from './header';
class Filter extends React.Component{
    constructor()
    {
        super();
        this.state={
            locations:[],
            restaurants:[],
            mealtype:undefined,
            location:undefined,
            sort:undefined,
            lcost:undefined,
            hcost:undefined,
            cuisine:[],
            page:undefined,
            locality:undefined,
            message:undefined,
            pagecount:undefined,
            pagecounting:[],
            northindian:false,
            southindian:false,
            chinese:false,
            fastfood:false,
            streetfood:false
        }
    }

    shouldComponentUpdate()
    {
        return true;
    }
  

  handleDetails=(resId)=>{
      this.props.history.push(`/details/?restaurant=${resId}`)
  }



  
  componentDidMount()
  {

    
    const qs=qString.parse(this.props.location.search);
    const  mealtype=qs.mealtype_id;
    const  location=qs.area;

    axios({
        url:'https://mysterious-reaches-60926.herokuapp.com/locations',
        method:'GET',
        headers:{'content-Type':'application/json'}
    }) 
    .then(res=>this.setState({locations:res.data.locations}))
    .catch(err=>console.log(err))

    axios({
        url:'https://mysterious-reaches-60926.herokuapp.com/filter',
        method:'POST',
        headers:{'content-Type':'application/json'},
        data:{
       
        location:location,
        mealtype:mealtype,
        }

    }).then(res=>this.setState({restaurants:res.data.filter, mealtype:mealtype , location:location , message:res.data.message, pagecount:res.data.pagecount,  pagecounting:res.data.pagecounts}))
    .catch(err=>console.log(err))

  }


  

  handlesort=(sort)=>{
    const {mealtype, location,lcost,hcost,cuisine,page,locality}=this.state;
    axios({
        url:'https://mysterious-reaches-60926.herokuapp.com/filter',
        method:'POST',
        headers:{'content-Type':'application/json'},

        data:{
        mealtype:mealtype,
        location:location,
        sort:sort,
        cuisine:cuisine.length!=0? cuisine:null,
        lcost:lcost,
        hcost:hcost,
        page:page,
        location:locality

        }

    }).then(res=>this.setState({restaurants:res.data.filter, sort:sort}))
    .catch(err=>console.log(err))

  }

  handlecostchange=(lcost,hcost)=>{
     
const {mealtype,location,sort,cuisine,page,locality}=this.state;
axios({
    url:'https://mysterious-reaches-60926.herokuapp.com/filter',
    method:'POST',
    headers:{'content-Type':'application/json'},

    data:{
    mealtype:mealtype,
    sort:sort,
    lcost:lcost,
    hcost:hcost,
    page:page,
    cuisine:cuisine.length!=0? cuisine:null,
    location:locality

    }

}).then(res=>this.setState({restaurants:res.data.filter, lcost:lcost, hcost:hcost,pagecounting:res.data.pagecounts}))
.catch(err=>console.log(err))
 
  }

  handlecuisine=(cuisineId)=>{

      
      
      const {mealtype,location,lcost,hcost,sort,page,locality,cuisine}=this.state;
 
   

    if (cuisine.indexOf(cuisineId) == -1) {
        cuisine.push(cuisineId);
    }
    else {
        var index = cuisine.indexOf(cuisineId);
        cuisine.splice(index, 1);
    }
    

      axios({
          url:'https://mysterious-reaches-60926.herokuapp.com/filter',
          method:'POST',
          headers:{'content-Type':'application/json'},
          data:{
              mealtype:mealtype,
              location:location,
              lcost:lcost,
              hcost:hcost,
              cuisine:cuisine.length!=0? cuisine: null,
              sort:sort,
              page:page,
              location:locality
            


          }
      })
      .then(res=>this.setState({restaurants:res.data.filter,cuisine:cuisine,pagecounting:res.data.pagecounts}))
      .catch(err=>console.log(err));

  }

  handlePage=(number)=>{
const {mealtype,location,sort,lcost,hcost,cuisine,locality}=this.state;

axios({
    url:'https://mysterious-reaches-60926.herokuapp.com/filter',
    method:'POST',
    headers:{'content-Type':'application/json'},
    data:{
        mealtype:mealtype,
        lcost:lcost,
        hcost:hcost,
        sort:sort,
        page:number,
        cuisine:cuisine.length!=0? cuisine:null,
        location:locality

    }
})
.then(res=>this.setState({restaurants:res.data.filter,page:number,pagecounting:res.data.pagecounts}))
.catch(err=>console.log(err));
  }
  
  

  handlelocation=(Event)=>{
      const locationsid=Event.target.value;
     
      const {lcost,hcost,sort,page,mealtype,cuisine}=this.state;
      axios({
          url:'https://mysterious-reaches-60926.herokuapp.com/filter',
          method:'POST',
          headers:{'content-Type':'application/json'},
          data:
          {
              mealtype:mealtype,
              location:locationsid,
              lcost:lcost,
              hcost:hcost,
              cuisine:cuisine.length!=0? cuisine :null,
              sort:sort,
              page:page

          }
      }).then(res=>this.setState({restaurants:res.data.filter, locality:locationsid,pagecounting:res.data.pagecounts}))
      .catch(err=>console.log(err))

  }

  render()
  {
      const {restaurants,message,pagecount,pagecounting}=this.state;
   const locations=this.state.locations;
    return(
      
        <div>

           <Header/>

                 <div id="myId" className="headings">Breakfast Places in Mumbai</div>
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236" onChange={this.handlelocation}>
                                    <option>Select</option>
                                    {
                                        locations.map((item)=>{
                                            return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })

                                    }
                                </select>
                                <div className="Cuisine">Cuisine</div>
    
                                <div>
                                    <input type="checkbox" className="mr-1"   onChange={()=>this.handlecuisine(1)} />
                                    <span className="checkbox-items" >North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" className="mr-1"    onChange={()=>this.handlecuisine(2)} />
                                    <span className="checkbox-items" >South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" className="mr-1"  onChange={()=>this.handlecuisine(3)} />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" className="mr-1"  onChange={()=>this.handlecuisine(4)} />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" className="mr-1"  onChange={()=>this.handlecuisine(5)} />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(1,500)}}/>
                                    <span className="checkbox-items" >Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(500,1000)}}/>
                                    <span className="checkbox-items" >&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(1000,1500)}}/>
                                    <span className="checkbox-items" >&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div style={{ display: 'block' }}>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(1500,2000)}}/>
                                    <span className="checkbox-items" >&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(2000,100000)}}/>
                                    <span className="checkbox-items" >&#8377; 2000 +</span>
                                </div>

                                <div>
                                    <input type="radio" name="cost" className="mr-1" onChange={()=>{this.handlecostchange(1,100000)}}/>
                                    <span className="checkbox-items" > All</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" className="mr-1"  onChange={()=>{this.handlesort(1)}}/>
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" className="mr-1" onChange={()=>{this.handlesort(-1)}}/>
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                                
                            </div>
                        </div>
                        

        <div className="col-sm-8 col-md-8 col-lg-8">
{restaurants.length!=0?
    restaurants.map((item)=>{
        return <div className="Item" onClick={()=>this.handleDetails(item._id)}>
            <div>
                <div className="small-item vertical">
                    <img src={`../${item.image}`} className="img"/>
                </div>
                <div className="big-item">
                    <div className="rest-name">{item.name}</div>
                    <div className="rest-location">{item.locality}</div>
                    <div className="rest-address">{item.city}</div>
                </div>
            </div>
            <hr />
            <div>
                <div className="margin-left">
                <div className="Bakery" style={{display:'inline-block'}}>CUISINES :</div>
                   {item && item.cuisine.map((item)=>{
                       return <div style={{display:'inline-block',color:'darkslateblue'}}>{item.name} &nbsp;</div>
                       
                   })
                   } 
                    <div className="Bakery">COST FOR TWO : &#8377; {item.min_price}</div>
                </div>
            </div>
          
        </div>
       
    })
:<marquee direction="right"><div className="records">No Records Found....</div></marquee>}


<div>
    <div className="pagination justify-content-center">
{restaurants.length!=0 && pagecounting ? pagecounting.map(item=>{

    return  <li className="page-item"><a className="btn btn-outline-success text-dark" className="page-link"  style={{display:'inline-block'}} onClick={()=>this.handlePage(item)}>{item}</a></li>

}) 



:null}
</div>
</div>
               </div>
                </div>
            </div>
            </div>
        );
  }
  }

export default Filter;






