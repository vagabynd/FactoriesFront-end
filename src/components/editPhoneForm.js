import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import actions from "../actions";


class EditPhoneForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {companies: []}
    }
    componentDidMount(){
        fetch('http://localhost:8080/phones/' + this.props.phoneId)
        .then(response => response.json())
        .then(data =>  {
            this.props.init(data);
        });
        fetch('http://localhost:8080/companies')
            .then(response => response.json())
            .then(data => {
                this.setState({companies: data});
            });
    }

    editPhone() {
        if (this.nameInput.value && this.priceInput.value && this.companyNameInput.value) {

            let company = this.state.companies.find(v => v.name === this.companyNameInput.value);

            let signInForm = {
                'phoneId': this.props.phoneId,
                'name': this.nameInput.value,
                'price': this.priceInput.value,
                'company': company
            };
            fetch('http://localhost:8080/phones/' + this.props.phoneId, {
                method: 'PUT',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signInForm)
            })
                .then(response => {
                        if (response.ok) this.reload();
                        else return response.json()
                    }
                )
                .then(data => {
                    if (data) alert(data.message);
                })
        }
        else alert("Fill the form");
    }
    reload(){
        fetch('http://localhost:8080/phones')
            .then(response => response.json())
            .then(data => {
                this.props.init(data);
                this.props.history.push('/phones');
            });

    }
    render(){
        console.log(this.props);
        return (
            <Form>
                <FormGroup>
                    <Label for="phoneName">Model</Label>
                    <Input type="text" name="name" defaultValue={this.props.phone.name} innerRef={(input) => {this.nameInput = input}}/>
                </FormGroup>

                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" name="num" id="price" defaultValue={this.props.phone.price} innerRef={(input) => {this.priceInput = input}}/>
                </FormGroup>

                <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input type="select" name="companyName" id="companyName" innerRef={(input) => {this.companyNameInput = input}} multiple>
                        {this.state.companies.map(item =>
                            <option key={item.companyId}>{item.name}</option>
                        )}
                    </Input>
                </FormGroup>

                <Button onClick={this.editPhone.bind(this)}>Edit</Button>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        phoneId: ownProps.match.params.id,
        phone: state.state
    };
};

export default  connect(mapStateToProps, actions)(EditPhoneForm)