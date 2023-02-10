import { Component } from "react";

class Counter extends Component{
    constructor(){
        super();
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this)
    }

     increment  ()  {
        this.setState({
            counter: ++this.state.counter
        });
    }

     decrement = () => {
        this.setState({
            counter: --this.state.counter
        });
    }
    render(){
        return (
            <div>
                <h1>Count Value: {this.state.counter}</h1>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>

            </div>
        )
    }
}
export default Counter