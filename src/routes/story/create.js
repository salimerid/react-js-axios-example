import React, {Component} from 'react';
import {errorMsg, successMsg} from '../../components/notification/ToastNotification';
import api from '../../api'

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            body  : '',
            author : '',
        }
    }

    createStory =(e) =>{
        e.preventDefault();
        let self = this;
        api.post('/api/story', this.state)
            .then(function (response) {
                console.log('story creation success response :: ',response);
                successMsg('Successfully Story Created.');
                self.setEmptyState();
            })
            .catch(function (error) {
                console.log("story creation error response :: ",error);
                errorMsg('Failed to Create Story.');
            });

    };

    setEmptyState = () =>{
        this.setState({title : ''});
        this.setState({body : ''});
        this.setState({author : ''});
    };

    render() {
        const {title, body, author} = this.state;
        return (
            <div className="container">
                <div className="starter-template">
                    <fieldset>
                        <legend>Create New Story</legend>

                        <form className="form-horizontal" onSubmit={this.createStory}>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">Title* </label>

                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="title" name="title" placeholder="Title"
                                           value={title}
                                           maxLength="512"
                                           onChange={(e) => this.setState({title: e.target.value})}
                                           required="true"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">Body* </label>
                                <div className="col-sm-4">
                                <textarea rows="20" className="form-control" id="body" name="body"
                                          value={body}
                                          maxLength="65535"
                                          onChange={(e) => this.setState({body: e.target.value})}
                                          placeholder="Full Story . . ." required="true">
                                </textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">Author Name*</label>

                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="author" name="author"
                                           value={author}
                                           maxLength="225"
                                           onChange={(e) => this.setState({author: e.target.value})}
                                           placeholder="Author Name"
                                           required="true"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">Create Story</button>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        )
    };
}

export default Create;
