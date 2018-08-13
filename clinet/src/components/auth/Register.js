import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";

import classnames from "classnames";


class Register extends Component {

    constructor(){
        super();

        this.state = {
            email: "",
            name: "",
            password: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {

            this.props.history.push("/profile");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault(); // ostanavlivaet perezagruzku formy pri submite formy

        const newUser = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        }

        this.props.registerUser(newUser, this.props.history);

    }



    render (){
        const {errors} = this.state;

        return(
            <div className="auth">

                <div className="auth-content">
                    <h1 className="auth-title"> Регистрация </h1>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup value={this.state.email} placeholder={"Email"} onChange={this.onChange} error={errors.email} name={"email"}/>
                        <TextFieldGroup value={this.state.name} placeholder={"Name"} onChange={this.onChange} error={errors.name} name={"name"}/>
                        <TextFieldGroup value={this.state.password} type={"password"} placeholder={"Password"} onChange={this.onChange} error={errors.password} name={"password"}/>
                        <div className="form-field">
                            <button className="button" type="submit">Регистрация</button>
                        </div>
                    </form>
                </div>

            </div>
        )

    }


}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {registerUser})(withRouter(Register));