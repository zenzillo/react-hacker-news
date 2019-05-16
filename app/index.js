import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import News from './components/News'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
	render() {
		return (
		    <Router forceRefresh={true}>
			    <div className='container'>
			    	<h1>Hacker News</h1>
			    	<Nav />

			    	<React.Suspense>
				    	<Switch>
					    	<Route exact path='/' render={(props) => <News story='top' />} />
					    	<Route exact path='/new' render={(props) => <News story='new' />} />
					    	<Route render={() => <h1>404</h1>} />
					    </Switch>
					</React.Suspense>
			    </div>
		    </Router>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)