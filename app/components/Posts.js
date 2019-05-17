import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'
import Loading from './Loading'
import Article from './Article'
import { Link } from 'react-router-dom'
import { getFormattedDateFromTimestamp } from '../utils/helper'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import { ThemeConsumer } from '../contexts/theme'

export default class Posts extends React.Component {
	state = {
		article: null,
		comments: null,
		error: null,
		loading: true
	}
	componentDidMount () {
    	const { id } = queryString.parse(this.props.location.search)

	    fetchItem(id)
	      .then((result) => {
	        this.setState({
	          article: result,
	          error: null,
	          loading: false
	        })
	      })
	      .then((result) => {
	      	fetchComments(this.state.article.kids)
	      		.then((comments) => {
			        this.setState({
			          comments: comments,
			          error: null,
			          loading: false
			        })
	      		})
	      		.catch(({ message }) => {
			        this.setState({
			          error: 'There was an error fetching the comments.',
			          loading: false
			        })
			      })
	      })
	      .catch(({ message }) => {
	        this.setState({
	          error: 'There was an error fetching the post.',
	          loading: false
	        })
	      })
	}
	render() {
		return (
		    <div>
		    {this.state.error !== null && <div>{this.state.error}</div>}
		    {this.state.comments === null
		    		? <Loading text="Fetching comments..." />
		    		:
		    			<ThemeConsumer>
	    					{({ theme }) => (
	    					    <React.Fragment>
		    						<Article articles={[this.state.article]} mainStyle='article-header' />
		    		  				<Comments comments={this.state.comments} theme={theme} />
		    		  			</React.Fragment>
		    		  		)}
		 				</ThemeConsumer>
		    	}
		    </div>
		)
	}
}

function Comments({ comments, theme }) {
	const list = comments.map((comment) => (
		<li key={comment.id} className="article">
			<div className='details'>
				<div className='meta'>
				by <Link to={`user?id=${comment.by}`}>{comment.by}</Link> on {getFormattedDateFromTimestamp(comment.time)}<br /><br />
				</div>
				{ ReactHtmlParser(comment.text) }
			</div>
		</li>
	 ))
	return (
	    <ul className={`bg-${theme}`}>{list}</ul>
	)
}