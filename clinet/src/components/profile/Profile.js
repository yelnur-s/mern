import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalForBlog from "../../common/ModalForBlog";
import {getUserBlog, deleteUserBlog} from "../../actions/blogAction";

class Profile extends Component {

    constructor(){
        super();
        this.state = {
            user: {},
            modalIsOpen: false,
            editBlog: null
        }

        this.showModal = this.showModal.bind(this);

    }

    componentWillReceiveProps(prop){

        this.setState({});

    }


    // works one time in one lifesircle
    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.props.getUserBlog();
            this.setState({user: this.props.auth.user});
        } else {
            this.props.history.push("/");
        }
    }




    deleteBlog(data) {
        this.props.deleteUserBlog(data);

    }

    openEditBlog(data){
        this.setState({editBlog: data, modalIsOpen: true});
    }



    showModal(){
        if(this.state.modalIsOpen) {
            this.setState({
                modalIsOpen: !this.state.modalIsOpen,
                editBlog: null
            })
        }
        else
            this.setState({
                modalIsOpen: !this.state.modalIsOpen
            })

    }

    showBlog(id) {
        this.props.history.push(`/blog/${id}`);
    }

    render (){
        console.log(this.state)
        const {user} = this.state;

        const userBlogs = this.props.blog.userBlogs.map((data, index)=>(
            <div className="blogs-item" key={index} onClick={this.showBlog.bind(this, data._id)}>
                <div className="blogs-item--editor">
                    <div onClick={this.openEditBlog.bind(this, data)}> edit </div>
                    <div onClick={this.deleteBlog.bind(this, data)}>&times;</div>
                </div>
                <div className="blogs-item--img">
                    {!data.img&&(<img src="https://png.pngtree.com/element_origin_min_pic/16/12/16/7bcc617031a94d7d326c438cbc70a671.jpg" alt=""/>)}
                    {data.img&&(<img src={data.img} alt=""/>)}
                </div>

                <h3 className="text-blod">{data.title}</h3>

            </div>
        ))

        return(
            <div className="profile">
                <div className="profile-author">
                    <div className="profile-author--info">
                        <img src={user.ava} alt=""/>
                        <h3 className="text-bold">{user.name}</h3>
                        <p className="text-desc">{user.position}</p>
                    </div>
                    <div className="profile-stats">
                        <div>
                            <h3 className="text-bold">354</h3>
                            <p className="text-desc">Connections</p>
                        </div>
                        <div>
                            <h3 className="text-bold">11</h3>
                            <p className="text-desc">views</p>
                        </div>
                    </div>
                    <div className="profile-social">
                        <div className="profile-social--item">
                            <img src="" alt=""/>
                            <p className="text-desc">linkedin</p>
                        </div>
                        <div className="profile-social--item">
                            <img src="" alt=""/>
                            <p className="text-desc">facebook</p>
                        </div>
                        <div className="profile-social--item">
                            <img src="" alt=""/>
                            <p className="text-desc">twitter</p>
                        </div>
                    </div>
                </div>
                <div className="profile-blogs">

                    <div className="profile-header">
                        Мой блоги
                        <button className="button righted" onClick={this.showModal}>
                            Добавить блог
                        </button>
                    </div>

                    <div className="blogs">
                        {userBlogs}
                    </div>
                </div>
                <ModalForBlog isOpen={this.state.modalIsOpen} showModal={this.showModal} blog={this.state.editBlog}/>
            </div>
        )

    }


}


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    getUserBlog: PropTypes.func.isRequired,
    deleteUserBlog:PropTypes.func
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    blog: state.blog
})

export default connect(mapStateToProps, {getUserBlog, deleteUserBlog})(withRouter(Profile));