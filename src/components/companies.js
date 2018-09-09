import { Button, Table, NavLink, Form, FormGroup, Label, Input  } from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions.js';
import {API_URL} from '../constants.js';

class CompanyItem extends React.Component {

    delete(e) {
        e.preventDefault();
        fetch(API_URL+'/companies/' + this.props.company.companyId, {
            method: 'delete'
        })
            .then(data => {if (data.ok) this.reload()})
    }

    reload(){
        fetch(API_URL+'/companies/')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            })
    }

    render() {
        return <tr>
            <td>{this.props.company.companyId}</td>
            <td><NavLink href={`/companies/${this.props.company.companyId}`}>{this.props.company.name}</NavLink></td>
            <td>{this.props.company.employees}</td>
            <td>{this.props.company.avgPrice}</td>
            <td><Button color="info" href={`/editCompany/${this.props.company.companyId}`}>Edit</Button>
                <Button color="danger" onClick={e => this.delete(e)}>Delete</Button></td>
        </tr>
    }
}


class Companies extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        fetch(API_URL+'/companies/')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            });
    }

    addCompany(){
        if (this.nameInput.value && this.employeesInput.value) {
            let signInForm = {
                'name': this.nameInput.value,
                'employees': this.employeesInput.value
            };

            this.nameInput.value = "";
            this.employeesInput.value = "";

            fetch(API_URL+'/companies/', {
                method: 'POST',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signInForm)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) this.reload();
                    else alert(data.message)})
        }
        else alert("Fill the form");
    }

    minMax(){
        let min = this.minEmployeesInput.value;
        let max = this.maxEmployeesInput.value;
        this.minEmployeesInput.value = "";
        this.maxEmployeesInput.value = "";
        fetch(API_URL+'/companies?minEmployees=' + min + '&maxEmployees=' + max)
            .then(response => response.json())
            .then(data => {
                this.props.init(data);
            });
    }

    reload(){
        fetch(API_URL+'/companies/')
            .then(response => response.json())
            .then(data => {
                this.props.init(data)
            })
    }

    render() {
        console.log(this.props);
        return(
        <div>
            <h4>Companies</h4>
            <Form inline>
                <FormGroup>
                    <Label for="minEmployees" hidden>Min employees</Label>
                    <Input type="number" name="minEmployees" id="minEmployees" placeholder="min employees" innerRef={(input) => {this.minEmployeesInput = input}}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="maxEmployees" hidden>Max employees</Label>
                    <Input type="number" name="maxEmployees" id="maxEmployees" placeholder="max employees" innerRef={(input) => {this.maxEmployeesInput = input}}/>
                </FormGroup>
                {' '}
                <Button onClick={this.minMax.bind(this)}>Find</Button>
            </Form>
            <h4></h4>
            <Table bordered>
                <thead>
                <tr>
                    <th scope="row">ID</th>
                    <th scope="row">Company</th>
                    <th scope="row">Employees</th>
                    <th scope="row">Average price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.props.companies.map(item =>
                    <CompanyItem key={item.companyId} company={item} init={this.props.init}/>
                )}
                </tbody>
            </Table>
            <Form inline>
                <FormGroup>
                    <Label for="addCompanyName" hidden>Company name</Label>
                    <Input type="text" name="companyName" id="addCompanyName" placeholder="Company name" innerRef={(input) => {this.nameInput = input}}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="addCompanyEmployees" hidden>Employees</Label>
                    <Input type="number" name="companyEmployees" id="addCompanyEmployees" placeholder="Employees" innerRef={(input) => {this.employeesInput = input}}/>
                </FormGroup>
                {' '}
                <Button onClick={this.addCompany.bind(this)}>Add</Button>
            </Form>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        companies: state.state
    };
}

export default connect(mapStateToProps, actions)(Companies);