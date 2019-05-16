import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import News from './components/News'

class App extends React.Component {
	render() {
		return (
		    <div>
		    	<News type='top' />
		    </div>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)