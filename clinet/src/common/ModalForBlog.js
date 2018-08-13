import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from "./TextFieldGroup";
import classnames from "classnames";
import {addBlog, updateBlog} from "../actions/blogAction"

class ModalForBlog extends Component {

    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            errors: {},
            isEdit: false,
            file: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);

    }


    componentWillReceiveProps(nextProp){

        if(nextProp) {
            if(nextProp.errors)
                this.setState({
                    errors: nextProp.errors
                })

            if(nextProp.blog)
                this.setState({title:  nextProp.blog.title,
                    description: nextProp.blog.description,
                    isEdit: true });
            else {
                this.setState({title:  "",
                    description: "",
                    isEdit: false });
            }

        }


    }

    onSubmit(e) {
        e.preventDefault();

        const sendData = {
            title: this.state.title,
            description: this.state.description,
            file: this.state.file
        }

        if(this.state.isEdit) {
            sendData._id = this.props.blog._id;
            this.props.updateBlog(sendData, this.props.showModal);
        }
        else
            this.props.addBlog(sendData, this.props.showModal);
    }


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeFile(e) {
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0]
        })
    }


    render (){
        const {errors, isEdit} = this.state;
        let title = "Добовление блога";
        if(isEdit) {
            title = "Редактирование блога";
        }


        return(
            <div className={classnames("modal", {"active": this.props.isOpen})} >
                <div className="modal-backdrop" onClick={this.props.showModal}></div>
                <div className="modal-inner">
                    <div className="modal-close" onClick={this.props.showModal}>
                        &times;
                    </div>

                    <div className="modal-title">
                        {title}
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="modal-form">
                            <TextFieldGroup value={this.state.title} name={"title"} onChange={this.onChange} placeholder={"Title"} error={errors.title}/>
                            <div className="form-field">
                                <textarea className="input textarea" value={this.state.description} name="description" onChange={this.onChange} placeholder="Description"></textarea>
                                {errors.description&&(<span className="input-msg--error">{errors.description}</span>)}
                            </div>
                            <div className="form-field" >
                                <input type="file" name="img" onChange={this.onChangeFile}/>
                            </div>
                            <div className="form-field">
                                <button className="button">Создать</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )

    }


}


ModalForBlog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    blog: PropTypes.object,
    showModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addBlog, updateBlog})(ModalForBlog);