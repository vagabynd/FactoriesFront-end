import { Button, Table, NavLink, Form, FormGroup, Label, Input  } from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions.js';


class PhoneItem extends React.Component {

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
            <td><Button color="info" href={`/editPhone/${this.props.phone.phoneId}`}>Edit</Button>
                <Button color="danger" onClick={e => this.delete(e)}>Delete</Button></td>
        </tr>
    }
}

class Phones extends React.Component {
    constructor(props){
        super(props);
        this.state = {companies: []}
    }
    componentDidMount(){
        this.reload();
    }
    addPhone(){
        if (this.modelInput.value && this.priceInput.value && this.companyNameInput.value) {

            let companyId = this.state.companies.find(v => v.name === this.companyNameInput.value).companyId;

            let signInForm = {
                'name': this.modelInput.value,
                'price': this.priceInput.value,
                'companyId': companyId
            };

            this.modelInput.value = "";
            this.priceInput.value = "";
            this.companyNameInput.value = "";

            fetch('http://localhost:8080/phones', {
                method: 'POST',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signInForm)
            })
                .then(data => {if (data.ok) this.reload()})
        }
        else alert("Fill the form");
    }
    reload() {
        fetch('http://localhost:8080/phones')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            });

        fetch('http://localhost:8080/companies')
            .then(response => response.json())
            .then(data => {
                this.setState({companies: data});
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
                        <Label for="addModel" hidden>Model</Label>
                        <Input type="text" name="model" id="addModel" placeholder="Model" innerRef={(input) => {this.modelInput = input}}/>
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="addPrice" hidden>Price</Label>
                        <Input type="number" name="price" id="addPrice" placeholder="Price" innerRef={(input) => {this.priceInput = input}}/>
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="addCompanyName" hidden>Company name</Label>
                        <Input type="select" name="companyName" id="addCompanyName" innerRef={(input) => {this.companyNameInput = input}}>
                        {this.state.companies.map(item =>
                            <option key={item.companyId}>{item.name}</option>
                        )}
                        </Input>
                    </FormGroup>
                    {' '}
                    <Button onClick={this.addPhone.bind(this)}>Add</Button>
                </Form>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        phones: state.state,
        companies: state.state
    };
}

export default connect(mapStateToProps, actions)(Phones);