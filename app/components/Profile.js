import React from 'react'
import queryString from 'query-string'
import Article from './Article'
import Loading from './Loading'
import { fetchUser, fetchPosts } from '../utils/api'
import { getFormattedDateFromTimestamp } from '../utils/helper'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'


export default class Profile extends React.Component {
	state = {
		user: null,
		articles: null,
		error: null,
		loading: true
	}
	componentDidMount () {
    	const { id } = queryString.parse(this.props.location.search)

	    fetchUser(id)
	      .then((result) => {
	        this.setState({
	          user: result,
	          error: null,
	          loading: false
	        })
	      })
	      .then((result) => {
  		    /* only get the first 20 articles */
  			const topArticles = this.state.user.submitted.slice(1, 21)
	      	fetchPosts(topArticles)
	      		.then((articles) => {
			        this.setState({
			          articles: articles,
			          error: null,
			          loading: false
			        })
	      		})
	      		.catch(({ message }) => {
			        this.setState({
			          error: 'There was an ERROR fetching the posts.',
			          loading: false
			        })
			      })
	      })
	      .catch(({ message }) => {
	        this.setState({
	          error: 'There was an error fetching the user.',
	          loading: false
	        })
	      })
	}
	render() {
		return (
		    <div>
		    {this.state.error !== null && <div>{this.state.error}</div>}
		    {this.state.articles === null
		    		? <Loading text="Fetching posts..." />
		    		:
		    			<ThemeConsumer>
	    					{({ theme }) => (
				    			<React.Fragment>
				    		  		<Author user={this.state.user} theme={theme} />
				    		  		<h2>Posts</h2>
				    		  		<Article articles={this.state.articles} />
				    		  	</React.Fragment>
				    		)}
		 				</ThemeConsumer>
		    	}
		    </div>
		)
	}
}


function Author({ user, theme }) {
	const karmaFormat = Number(user.karma).toLocaleString()
	return (
    	<div>
    		<h1 className={`header ${theme}`}>{user.id}</h1>
			<div className='details'>
				joined <strong>{getFormattedDateFromTimestamp(user.created)}</strong> has <strong>{karmaFormat}</strong> karma
			</div>
			<br />
			{ user.about && ReactHtmlParser(user.about) }
		</div>
	)
}

Author.propTypes = {
	user: PropTypes.object.isRequired,
	theme: PropTypes.string,
}