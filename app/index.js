import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import News from './components/News'
import Nav from './components/Nav'

class App extends React.Component {
	render() {
		return (
		    <div className='container'>
		    	<h1>Hacker News</h1>
		    	<Nav />
		    	<News type='top' />
		    </div>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)