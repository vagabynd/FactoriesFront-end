import { Button, Table, NavLink, Form, FormGroup, Label, Input  } from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions.js';


class PhoneItem extends React.Component {

    edit(e){
        e.preventDefault();
    }

    delete(e) {
        e.preventDefault();
        fetch('http://localhost:8080/phones/' + this.props.phone.phoneId, {
            method: 'delete'
        })
            .then(data => {if (data.ok) this.reload()})
    }

    reload(){
        fetch('http://localhost:8080/phones')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            })
    }

    render() {
        return <tr>
            <td>{this.props.phone.phoneId}</td>
            <td><NavLink href={`/phones/${this.props.phone.phoneId}`}>{this.props.phone.name}</NavLink></td>
            <td>{this.props.phone.price}</td>
            <td>{this.props.phone.companyName}</td>
            <td><Button color="info" onClick={e => this.edit(e)}>Edit</Button>
                <Button color="danger" onClick={e => this.delete(e)}>Delete</Button></td>
        </tr>
    }
}

class Phones extends React.Component {
    componentDidMount(){
        fetch('http://localhost:8080/phones')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            });
    }

    render() {
        return(
            <div>
                <h4>Phones</h4>
                <Table bordered>
                    <thead>
                    <tr>
                        <th scope="row">ID</th>
                        <th scope="row">Model</th>
                        <th scope="row">Price</th>
                        <th scope="row">Company</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.phones.map(item =>
                        <PhoneItem key={item.phoneId} phone={item} init={this.props.init}/>
                    )}
                    </tbody>
                </Table>
                <Form inline>
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Model" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Price" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Company name" />
                    </FormGroup>
                    {' '}
                    <Button>Add</Button>
                </Form>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        phones: state
    };
}

export default connect(mapStateToProps, actions)(Phones);