import React, {Component} from 'react'
import Modal from "react-bootstrap/lib/Modal";
import {errorMsg, successMsg} from '../../components/notification/ToastNotification';
import Pagination from 'react-bootstrap/lib/Pagination';
import api from '../../api';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            story: {
                id: 0,
                title: '',
                body: '',
                author: '',
            },
            stories: [],
            updateDlgFlg: false,
            deleteDlgFlg: false,
            current: 0,
            limit: 5,
            totalElements : 0,
            totalPages : 0
        };
        this.loadStory();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.current !== this.state.current) {
            this.loadStory();
        }
    }


    loadStory = () => {
        let self = this;
        api.get('/api/stories', { params: {page : self.state.current, limit : self.state.limit }})
            .then(function (response) {
                console.log("stories success response :: ", response.data);
                self.setState({stories: []});
                self.setState({stories: self.state.stories.concat(response.data.content)});
                self.setState({current: response.data.number});
                self.setState({totalPages: response.data.totalPages-1});
                self.setState({totalElements: response.data.totalElements});
            })
            .catch(function (error) {
                console.log("stories error response :: ", error);
            });


    };

    updateStory = (e) => {
        e.preventDefault();
        const {story} = this.state;
        let self = this;
        api.put('/api/story/'+story.id, story)
            .then(function (response) {
                console.log('story update success response :: ',response);
                successMsg('Successfully Story updated.');
                self.handleUpdateDlgClose();
                self.loadStory();
            })
            .catch(function (error) {
                console.log("story update error response :: ",error);
                errorMsg('Failed to Update Story.');
            });

    };

    deleteStory = (e) => {
        e.preventDefault();
        const {story} = this.state;
        let self = this;
        api.delete('/api/story/'+story.id)
            .then(function (response) {
                console.log('story delete success response :: ',response);
                successMsg('Successfully Story Deleted.');
                self.handleDeleteDlgClose();
                self.loadStory();
            })
            .catch(function (error) {
                console.log("story delete error response :: ",error);
                errorMsg('Failed to Delete Story.');
            });

    };

    // ---------Update Dialog open/close--------
    handleUpdateDlgClose() {
        this.setState({updateDlgFlg: false});
    };

    handleUpdateDlgShow(data) {
        this.setStoryToState(data);
        this.setState({updateDlgFlg: true});
    };

    // ---------Delete Dialog open/close--------
    handleDeleteDlgClose() {
        this.setState({deleteDlgFlg: false});
    };

    handleDeleteDlgShow(data) {
        this.setStoryToState(data);
        this.setState({deleteDlgFlg: true});
    };

    setStoryToState(data) {
        const {story} = this.state;
        if (data !== null) {
            story.id = data.id;
            story.title = data.title;
            story.body = data.body;
            story.author = data.author;
            this.setState({story});
        }
    };

    onPaginationChange(current){
        console.log(current);
        this.setState({
            current: current,
        });

    };

    paginationPrev() {
        const {current} = this.state;
        if (current !== 0)
            this.setState({
                current: current - 1,
            });
    }

    paginationNext(){
        const {current, totalPages} = this.state;
        if(current < totalPages)
            this.setState({
                current: current + 1,
            });
    }

    render() {
        const {stories, story, updateDlgFlg, deleteDlgFlg, current, totalPages, totalElements} = this.state;
        let storyItem = [];
        for (let number = 0; number <= totalPages; number++) {
            storyItem.push(
                <Pagination.Item active={number === current} onClick={() => this.onPaginationChange(number)}>{number+1}</Pagination.Item>
            );
        }

        let storiesComponent = stories.map((story) =>
            <div className="story">
                <h4><strong>{story.title}</strong></h4>
                <p>{story.body}</p>
                By <strong>{story.author}</strong>
                <br/> <br/>
                <button className='btn btn-primary' onClick={() => this.handleUpdateDlgShow(story)}> Update</button>
                &nbsp; &nbsp; &nbsp;
                <button className='btn btn-primary' onClick={() => this.handleDeleteDlgShow(story)}> Delete</button>
                <hr/>
            </div>
        );

        return (
            <div>
                <div className="container">
                    <div className="starter-template">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="story-header">
                                    <h2><strong>Stories</strong></h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                {storiesComponent}
                                <div className="pagination-div">
                                    <span>Total Stories: {totalElements}</span><br/>
                                    <Pagination bsSize="medium">
                                        <Pagination.Prev onClick={() => this.paginationPrev()}/>
                                        {storyItem}
                                        <Pagination.Next onClick={() => this.paginationNext()} />
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    show={updateDlgFlg}
                    onHide={() => this.handleUpdateDlgClose()}
                    aria-labelledby="ModalHeader"
                >
                    <form onSubmit={this.updateStory}>
                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'>Story Update</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Title* </label>

                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="title" name="title"
                                               placeholder="Title"
                                               value={story.title}
                                               maxLength="512"
                                               onChange={(e) => this.setState({
                                                   story: {
                                                       ...story,
                                                       title: e.target.value
                                                   }
                                               })}
                                               required="true"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Body* </label>
                                    <div className="col-sm-10">
                                         <textarea rows="20" className="form-control" id="body" name="body"
                                                   maxLength="65535"
                                                   value={story.body}
                                                   onChange={(e) => this.setState({story: {...story, body: e.target.value}})}
                                                   placeholder="Full Story . . ." required="true">
                                         </textarea>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Author Name*</label>

                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="author" name="author"
                                               value={story.author}
                                               maxLength="225"
                                               onChange={(e) => this.setState({
                                                   story: {
                                                       ...story,
                                                       author: e.target.value
                                                   }
                                               })}
                                               placeholder="Author Name"
                                               required="true"/>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-primary' type="button" onClick={() => this.handleUpdateDlgClose()}>
                                Cancel
                            </button>
                            <button className='btn btn-primary' type="submit">
                                Update
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>

                <Modal
                    show={deleteDlgFlg}
                    onHide={() => this.handleDeleteDlgClose()}
                    aria-labelledby="ModalHeader"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Delete Story</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you want to Delete Story ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' type="button" onClick={() => this.handleDeleteDlgClose()}>
                            No
                        </button>
                        &nbsp; &nbsp;
                        <button className='btn btn-primary' onClick={this.deleteStory}>
                            Yes
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Home;