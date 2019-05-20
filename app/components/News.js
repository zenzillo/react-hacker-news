import React from 'react'
import Article from './Article'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'

export default class News extends React.Component {
	state = {
		articles: null,
		error: null
	}
	componentDidMount() {
		this.handleFetch()
	}
	componentDidUpdate(prevProps) {
		if (prevProps.story !== this.props.story) {
			this.handleFetch()
		}
	}
	handleFetch() {
		fetchMainPosts(this.props.story)
		    .then((data) => this.setState({
			    articles: data
			}))
		    .catch(() => this.setState({
		        error: `There was an error fetching the stories.`
		    }))
	}
	render() {
		return (
		    <div>
		    	{this.state.error !== null && <div>{this.state.error}</div>}
		    	{this.state.articles === null
		    		? <Loading />
		    		: <Article articles={this.state.articles} />
		    	}
		    </div>
		)
	}
}

News.propTypes = {
	story: PropTypes.string.isRequired
}