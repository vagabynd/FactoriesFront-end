import React from 'react';
import {connect} from 'react-redux';
import actions from "../actions";
import {API_URL} from '../constants.js';

class Phone extends React.Component{
    componentDidMount(){fetch(API_URL+'/phones/' + this.props.phoneId)
        .then(response => response.json())
        .then(data =>  {
            this.props.initPhone(data);
        });
    }

    render(){
        console.log(this.props.phone);
        return <div><h2>ID: {this.props.phone.phoneId}</h2>
            <h2>Model: {this.props.phone.name}</h2>
            <h2>Price: {this.props.phone.price}</h2>
            <h2>Company: {this.props.phone.company.name}</h2>
        </div>
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        phoneId: ownProps.match.params.id,
        phone: state.phone
    };
};

export default  connect(mapStateToProps, actions)(Phone);