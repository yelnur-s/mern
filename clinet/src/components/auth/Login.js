import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from "../../actions/authActions";

class Login extends Component {

    constructor(){
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {

            this.props.history.push("/profile");
        }
    }


    // not works on first render
    componentWillReceiveProps(nextProp){
        if(nextProp) {
            this.setState({errors: nextProp.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(user, this.props.history);


    }



    render (){

        const {errors} = this.state;

        return(
            <div className="auth">

                <div className="auth-content">
                    <h1 className="auth-title"> Войти в систему </h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-field">
                            <input value={this.state.email} onChange={this.onChange} name="email" placeholder="Email" className={classnames("input", {"is-error": errors.email}) } type="text"/>
                            {errors.email&&(<span className="input-msg--error">{errors.email}</span>)}
                        </div>
                        <div className="form-field">
                            <input value={this.state.password} onChange={this.onChange} name="password" placeholder="Password"   className={classnames("input", {"is-error": errors.password}) } type="password"/>
                            {errors.password&&(<span className="input-msg--error">{errors.password}</span>)}
                        </div>
                        <div className="form-field">
                            <button className="button">Войти</button>
                        </div>
                    </form>
                </div>

            </div>
        )

    }


}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));