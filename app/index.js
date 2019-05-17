import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import News from './components/News'
import Comments from './components/Comments'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import Profile from './components/Profile'

class App extends React.Component {
	render() {
		return (
		    <Router forceRefresh={true}>
			    <div className='container'>
			    	<h1>Hacker News</h1>
			    	<Nav />

			    	<React.Suspense fallback={<Loading />}>
				    	<Switch>
					    	<Route exact path='/' render={(props) => <News story='top' />} />
					    	<Route exact path='/new' render={(props) => <News story='new' />} />
					    	<Route exact path='/post' component={Comments} />
					    	<Route exact path='/user' component={Profile} />
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