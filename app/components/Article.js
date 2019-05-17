import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getFormattedDateFromTimestamp } from '../utils/helper'

export default class Article extends React.Component {

	render() {
		const { mainStyle } = this.props
		const list = this.props.articles.map((article) => (
						<li key={article.id} className={mainStyle}>
							<a href={article.url} target='_blank' className='article-title'>{article.title}</a><br />
							<div className='details'>
								by <Link to={`user?id=${article.by}`}>{article.by}</Link>&nbsp;
								on {getFormattedDateFromTimestamp(article.time)}&nbsp;
								with <Link to={`post?id=${article.id}`}>{article.kids ? article.kids.length : '0'}</Link> comments
							</div>
						</li>
					 ))
		return (
		    <ul>{list}</ul>
		)
	}
}

Article.propTypes = {
	articles: PropTypes.array.isRequired,
	mainStyle: PropTypes.string.isRequired
}

Article.defaultProps = {
	mainStyle: 'article'
}