import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getSingleBlog} from "../actions/blogAction";
import moment from 'moment';

class ShowBlog extends Component {

    constructor(){
        super();
        this.state = {
            blog: {
                comments: [],
                author: {}
            }
        }
    }

    componentDidMount(){
        // S parametrov routa brate danniye
        this.props.getSingleBlog(this.props.match.params.id);


    }



    componentWillReceiveProps(nextProps) {

        if(nextProps) {
            this.setState({
                blog: nextProps.blogReducer.blog
            })

            // console.log(this.props.match.params.id, this.state.blog._id)

            if(nextProps.match.params.id!==this.state.blog._id) {
                this.props.getSingleBlog(nextProps.match.params.id);
            }
        }

    }





    render (){
        const {blog} = this.state;

        return (
            <div className="block block-centered">
                    <img className="post-img" src={blog.img}/>
                    <h1 className="post-title" > {blog.title}</h1>
                    <p className="post-date">Published on { moment(blog.date).format('DD-MMM-YY HH:mm:ss')}</p>
                    <div className="post-info">
                        <div className="post-author">
                            <div className="post-author--img">
                                <img src=""/>
                            </div>
                            <div className="post-author--content">
                                <h2>{blog.author.name}</h2>
                                <a > 21 постов </a>
                            </div>
                        </div>
                        <div className="post-icons">
                            <div className="post-icons--item">
                                <div className="post-icons--img">
                                    <img src="images/like.svg"/>
                                </div>
                                324234
                            </div>
                            <div className="post-icons--item">
                                <div className="post-icons--img">
                                    <img src="images/comment.svg"/>
                                </div>
                                {/*{blog.comments.length}*/}
                            </div>
                        </div>
                    </div>
                    <p className="post-desc">{blog.description}</p>

                    <div className="comment-block">
                        {/*<h2 className="comment-title">{blog.comments.length} comments</h2>*/}
                        <div className="comments">
                            <div className="comments-item">
                                <div className="comments-item--img">
                                    <img src="images/ava.svg"/>
                                </div>
                                <div className="comments-item--content">
                                    <form>
                                        <input className="input" placeholder="Введите комметарии"/>
                                    </form>
                                </div>
                            </div>

                            <div className="comments-item">

                                <div className="comments-item--delete">
                                    <img src="images/close-black.svg"/>
                                </div>


                                <div className="comments-item--img">
                                    <img src=""/>
                                </div>
                                <div className="comments-item--content">
                                    <h3 >Alem Utemissov</h3>
                                    <p>Lorem Ipsum is simply dummy
                                        text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                                    <span>52 секунды назад</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>)


    }


}


ShowBlog.propTypes = {
    blogReducer: PropTypes.object.isRequired,
    getSingleBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    blogReducer: state.blog
})

export default connect(mapStateToProps, {getSingleBlog})((ShowBlog));