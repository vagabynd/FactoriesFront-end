import { Button, Table, NavLink, Form, FormGroup, Label, Input  } from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions.js';

class CompanyItem extends React.Component {

    delete(e) {
        e.preventDefault();
        fetch('http://localhost:8080/companies/' + this.props.company.companyId, {
            method: 'delete'
        })
            .then(data => {if (data.ok) this.reload()})
    }

    reload(){
        fetch('http://localhost:8080/companies')
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
        fetch('http://localhost:8080/companies')
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

            fetch('http://localhost:8080/companies', {
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
    reload(){
        fetch('http://localhost:8080/companies')
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
            <Table bordered>
                <thead>
                <tr>
                    <th scope="row">ID</th>
                    <th scope="row">Company</th>
                    <th scope="row">Employees</th>
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