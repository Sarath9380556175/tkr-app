import React from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/Home.css';


class QuickSearchItem extends React.Component{
handleClick=(mealtype)=>{
    const locationId=sessionStorage.getItem('locationId');
    if(locationId)
    {
    this.props.history.push(`/filter/?mealtype_id=${mealtype}&&area=${locationId}`);

    }
    else{
    this.props.history.push(`/filter/?mealtype_id=${mealtype}`);
    }
}

    render()
    {
        const {item}=this.props;
        return(
            

            <div className="col-sm-12 col-md-6 col-lg-3 p-3 mb-3 mt-3 border bg-white"  data-toggle="tooltip"  title={item.content}  data-placement="left"  style={{boxShadow: " 0 6px 6px 0 rgba(0, 0, 0, 0.16)",marginRight: "10px"}} onClick={()=>this.handleClick(item.meal_type)}>
			<img src={item.image} width="100px" height="100px" style={{display: "inline-block",width: "45%",verticalAlign: "top"}}/>
			<div style={{display: "inline-block",width: "55%"}} className="pl-3">
			<div className="breakfast">{item.name}</div>
			<div className="bf-sub">{item.content}</div>
		</div>
	</div>
        )
    }
}

export default withRouter(QuickSearchItem);