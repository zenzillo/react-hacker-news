import React from 'react'
import Article from './Article'
import { fetchMainPosts } from '../utils/api'

export default class News extends React.Component {
	state = {
		articles: null,
		error: null
	}
	componentDidMount() {
		fetchMainPosts(this.props.type)
		    .then((data) => {
			    this.setState({
			    	articles: data
			    })
		    })
		    .catch(() => {
		      console.warn('Error fetching stories')

		      this.setState({
		        error: `There was an error fetching the stories.`
		      })
		    })
	}
	render() {
		return (
		    <div>
		    	{this.state.articles === null
		    		? <p>LOADING</p>
		    		: <Article articles={this.state.articles} />
		    	}
		    </div>
		)
	}
}