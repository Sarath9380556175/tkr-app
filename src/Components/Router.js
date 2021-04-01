import React from 'react';
import {Route , BrowserRouter } from 'react-router-dom';
import Filter from './Filter';
import Details from './Details';
import Home from './Home';
class Router extends React.Component{
  
    render()
    {
        
    
        return(
            <BrowserRouter>
            <Route exact path ='/'  component = {Home} />
            <Route exact path ='/filter'  component = {Filter} />
            <Route path='/details'  component= {Details}/>
            </BrowserRouter>
        
            
        )
    }
    
}

export default Router;