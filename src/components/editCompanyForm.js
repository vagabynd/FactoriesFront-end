import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import actions from "../actions";


class EditCompanyForm extends React.Component{

    componentDidMount(){fetch('http://localhost:8080/companies/' + this.props.companyId)
        .then(response => response.json())
        .then(data =>  {
            this.props.init(data);
        })}

    editCompany(){
        if (this.nameInput.value && this.employeesInput.value) {
            let signInForm = {
                'companyId': this.props.companyId,
                'name': this.nameInput.value,
                'employees': this.employeesInput.value
            };

            fetch('http://localhost:8080/companies/' + this.props.companyId, {
                method: 'PUT',
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
                this.props.init(data);
                this.props.history.push('/companies');
            })
    }
    render(){
        return (
            <Form>
                <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input type="text" name="name" defaultValue={this.props.company.name} innerRef={(input) => {this.nameInput = input}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="employees">Employees</Label>
                    <Input type="number" name="num" id="employees" defaultValue={this.props.company.employees} innerRef={(input) => {this.employeesInput = input}}/>
                </FormGroup>
                <Button onClick={this.editCompany.bind(this)}>Edit</Button>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        companyId: ownProps.match.params.id,
        company: state.state
    };
};

export default  connect(mapStateToProps, actions)(EditCompanyForm)