// Imports
import React, { Component } from 'react'
import axios from 'axios'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

class Companies extends Component {
    state={
        companies: []
    }

    componentDidMount() {
        this.getCompanies()
    }

    // DB Data Extractor
    getCompanies() {
        axios.get('/companies')
            .then(res => {
                const data = res.data
                this.setState({ companies: data })
            })
            .catch(err => console.error(err))
    }

    render() {
        return(
            <React.Fragment>
                <Container>
                    <Button variant='contained' color='primary' style={{ transform: 'translateY(58px)'}} href='/'>Back</Button>
                    <h1 style={{ textAlign: 'center'}}>Companies</h1>

                    {/* Company Data */}
                    <TableContainer component={Paper}>
                        <Table aria-label='company data' style={{ margin: '0 auto' }}>
                            <TableHead>
                            <TableRow>
                                <TableCell align='center'>CIN</TableCell>
                                <TableCell align='center'>Company</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.companies.map((company) => (
                                <TableRow key={company._id}>
                                <TableCell component='th' scope='row' align='center'>
                                    {company.cin}
                                </TableCell>
                                <TableCell align='center'>{company.name}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Container>
            </React.Fragment>
        )
    }
}

export default Companies