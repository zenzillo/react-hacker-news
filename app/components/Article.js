import React from 'react'

export default class Article extends React.Component {
	render() {

		const list = this.props.articles.map((article) => (
						<li key={article.id}>
							{article.title}<br />
							{article.by}
						</li>
					 ))

		return (
		    <div>
		    	Article Title &amp; Info<br />
		    	<ul>{list}</ul>
		    </div>
		)
	}
}