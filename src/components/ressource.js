import{Component} from "react"
class Ressource extends Component{
    render(){
        const{name, children} = this.props
        return(
            <h1>Name: {name} {children}</h1>
        )
    }
}

export default Ressource