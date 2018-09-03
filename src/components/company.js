import React from 'react';
import {connect} from 'react-redux';
import actions from "../actions";

class Item extends React.Component {

    render() {
        return (
            <h3>{this.props.phone.name}</h3>
        );

    }
}

class Company extends React.Component{
    componentDidMount(){fetch('http://localhost:8080/companies/' + this.props.companyId)
        .then(response => response.json())
        .then(data =>  {
            this.props.initPhones(data);
        })}
    render(){
        console.log(this.props);
        return <div>
                    <h2>ID: {this.props.company.companyId}</h2>
                    <h2>Company name: {this.props.company.name}</h2>
                    <h2>Employees: {this.props.company.employees}</h2>
                    <h2>Phones:</h2>
                    {this.props.company.phones.map(item =>
                        <Item key={item.phoneId} phone={item}/>
                    )}
                </div>
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        companyId: ownProps.match.params.id,
        company: state
    };
};

export default  connect(mapStateToProps, actions)(Company);