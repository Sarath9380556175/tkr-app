import React from 'react';
import Skr from './Prop';
class Hemanth extends React.Component
{
    constructor()
    {
        super();  //super method refers to parent class 
        this.state={
            value:0,
            color:"red",
            background:"blue"
        }

    }

Increment=()=>
    {
        this.setState({value : this.state.value +2});
    }
    Change=()=>{
        this.setState({background:"green"});
    }
    Color=()=>
    {
        this.setState({color:"orange"})
    }


    time=()=>{
          alert("hello sarath reddy")
     }

    render()
    {
        const fname={
            color:"black",
            colge:"svce"
        }

        const on={
            color:"green"
        }

        return(
            <div>
            <h1>{this.state.value}</h1>
            <p style={{color:"red"}}>Where are you {this.state.color}</p>
            <p style={{color:"red"}}>Where are you {this.state.background}</p>
            <button onClick={this.Increment}>increment</button>
            <button onClick={this.Change}>change</button>
            <button onClick={this.Color}>Color</button>
            <button onClick={this.time}>timeout</button>
            <Skr/>
            </div>
        );
    }
}

export default Hemanth;