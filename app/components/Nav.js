import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle =  {
	color: '#D12A54'
}

export default function Nav() {
	return (
	    <ThemeConsumer>
	    	{({theme, toggleTheme}) => (
			    <nav className='row space-between'>
				    <ul className='row nav'>
				    	<li>
				    	<NavLink
				    		to='/'
				    		exact
				    		activeStyle={activeStyle}
				    		className='nav-link'>
				    		Top
				    	</NavLink>
				    	</li>
				    	<li>
					    	<NavLink
					    		to='/new'
					    		activeStyle={activeStyle}
					    		className='nav-link'>
					    		New
					    	</NavLink>
					    </li>
					</ul>
			   	   <button
			   	   		style={{fontSize: 30}}
			   	   		className='btn-clear'
			   	   		onClick={toggleTheme}
			   	   >
			   	   	  {theme === 'light' ? '🔦' : '💡'}
			   	   </button>
			    </nav>
	    	)}
	    </ThemeConsumer>
	)
}