import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './Landing'
import Companies from './Companies'

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <div>
                <Route path='/' exact component={Landing} />
                <Route path='/companies' component={Companies} />
            </div>
        </BrowserRouter>
    </React.Fragment>
)

export default App