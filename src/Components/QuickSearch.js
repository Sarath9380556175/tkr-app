import React from 'react';
import '../styles/Home.css';
import QuickSearchItem from './QuckSearchItem'
class Quicksearch extends React.Component{



    render()
    {
		const {mealtypes}=this.props;
        return(
            <div>
<div className="container">
<div className="quick">Quick Searches</div>
<div className="Discover">Discover restaurants by type of meal</div>
</div>
<div className="container">
<div className="row">
	{
		mealtypes.map((item)=>{
			return <QuickSearchItem item={item}/>
		})
	}
	
  </div>
        </div>
             </div>
		
        )
    }
}

export default Quicksearch;