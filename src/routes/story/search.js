import React, {Component} from 'react';
import {errorMsg, successMsg} from '../../components/notification/ToastNotification';
import api from '../../api'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData: {
                title: '',
                body: '',
                author: '',
            },
            stories: []
        }
    }

    searchStory = (e) => {
        e.preventDefault();
        const {filterData} = this.state;
        let self = this;
        api.get('/api/story?search=title:' + filterData.title + ',body:' + filterData.body + ',author:' + filterData.author)
            .then(function (response) {
                self.setState({stories: []});
                if (response.data !== null & response.data.length > 0) {
                    self.setState({stories: self.state.stories.concat(response.data)});
                    self.setEmptyState();
                } else {
                    successMsg('Story Not Found!');
                }
            })
            .catch(function (error) {
                console.log("story search error response :: ", error);
                errorMsg('Story Not Found!');
            });

    };

    setEmptyState = () => {
        this.setState({title: ''});
        this.setState({body: ''});
        this.setState({author: ''});
    };

    render() {
        const {filterData, stories} = this.state;

        let storiesComponent = stories.map((story) =>
            <div className="story">
                <hr/>
                <h4><strong>{story.title}</strong></h4>
                <p>{story.body}</p>
                By <strong>{story.author}</strong>
            </div>
        );

        return (
            <div className="container">
                <div className="starter-template">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="story-header">
                                <h2><strong>Search</strong></h2>
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Title </label>

                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="title" name="title"
                                                   placeholder="Title"
                                                   value={filterData.title}
                                                   onChange={(e) => this.setState({
                                                       filterData: {
                                                           ...filterData,
                                                           title: e.target.value
                                                       }
                                                   })}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Body</label>
                                        <div className="col-sm-9">
                                            <input className="form-control" id="body" name="body"
                                                   value={filterData.body}
                                                   onChange={(e) => this.setState({
                                                       filterData: {
                                                           ...filterData,
                                                           body: e.target.value
                                                       }
                                                   })}
                                                   placeholder="Body">
                                            </input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Author Name</label>

                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="author" name="author"
                                                   value={filterData.author}
                                                   onChange={(e) => this.setState({
                                                       filterData: {
                                                           ...filterData,
                                                           author: e.target.value
                                                       }
                                                   })}
                                                   placeholder="Author Name"/>
                                        </div>
                                    </div>
                                </div>
                                <button className='btn btn-primary' onClick={this.searchStory}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {storiesComponent}
                        </div>
                    </div>
                </div>
            </div>

        )
    };
}

export default Search;
