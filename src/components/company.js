import React from 'react';
import {connect} from 'react-redux';
import actions from "../actions";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {API_URL} from '../constants.js';

class Item extends React.Component {

    render() {
        return (
            <ListGroupItem>{this.props.phone.name}</ListGroupItem>
        );
    }
}

class Company extends React.Component{
    componentDidMount(){fetch(API_URL+'/companies/' + this.props.companyId)
        .then(response => response.json())
        .then(data =>  {
            this.props.initPhones(data);
        })}
    render(){
        return <div>
                    <ListGroup>
                    <ListGroupItem>ID: {this.props.company.companyId}</ListGroupItem>
                    <ListGroupItem>Company name: {this.props.company.name}</ListGroupItem>
                    <ListGroupItem>Employees: {this.props.company.employees}</ListGroupItem>
                    <ListGroupItem>Phones:</ListGroupItem>
                    {this.props.company.phones.map(item =>
                        <Item key={item.phoneId} phone={item}/>
                    )}
                    </ListGroup>
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