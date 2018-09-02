import React from 'react';
import {connect} from 'react-redux';
import actions from "../actions";

class Company extends React.Component{
    componentDidMount(){fetch('http://localhost:8080/companies/' + this.props.companyId)
        .then(response => response.json())
        .then(data =>  {
            this.props.init(data);
        })}
    render(){
        return <div><h2>ID: {this.props.company.companyId}</h2>
                    <h2>Company name: {this.props.company.name}</h2>
                    <h2>Employees: {this.props.company.employees}</h2>
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