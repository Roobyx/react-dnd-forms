// Vendor
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// Components
import theme from './components/themes/default'
import GlobalStyle from './components/themes/globalStyle'
	// Pages
import HomePage from './components/Pages/HomePage/index'
import CreateEditPage from './components/Pages/CreateEditPage/index'
// import EditPage from './components/Pages/EditPage/index'
import ValidatePage from './components/Pages/ValidatePage'
import NotFoundPage from './components/Pages/NotFoundPage/index'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route path="/" component={HomePage} exact />
					<Route path="/form/create/" component={CreateEditPage} />
					<Route path="/form/edit/:formId" component={CreateEditPage} />
					<Route path="/validate/:formId" component={ValidatePage} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

export default App
