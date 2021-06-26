// Imports
import React, { Component } from 'react'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

class Landing extends Component {
    state = {
        inputValue: '',
        selectedOption: null,
        options: []
    }

    // Change Handlers
    handleInputChange = value => {
        this.setState({ inputValue: value })
    }

    // DB Entry Function
    addEntry = () => {
        axios({
            method: 'POST',
            url: `/companies?cin=${this.state.selectedOption.cin}&name=${this.state.selectedOption.name}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(window.location.href = '/companies')
        .catch(err => console.error(err))
    }
    

    // Suggestions Function
    loadOptions = () => {
        axios({
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://www.zaubacorp.com/custom-search',
            data: {
                search: this.state.inputValue.toLowerCase(),
                filter: 'company'
            },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            let el = document.createElement('div')
            el.innerHTML = res.data
            this.setState({ options: [] })
            for (let i = 0; i < el.getElementsByTagName('div').length; i++) {
                let entry = {
                    cin: el.getElementsByTagName('div')[i].id.replace(/company\/(.*?)\//gm,''),
                    name: el.getElementsByTagName('div')[i].innerText
                }
                this.state.options.push(entry)
            }
        })
    }

    render() {
        const { selectedOption, options } = this.state
        return(
            <React.Fragment>
                <Container>
                    <Button variant='contained' color='secondary' style={{ transform: 'translateY(58px)'}} href='/companies'>Companies</Button>
                    <h1 style={{ textAlign: 'center', marginBottom: '60px'}}>Landing</h1>

                    {/* Search Box */}
                    <AsyncSelect
                        autoFocus
                        cacheOptions
                        defaultOptions
                        value={selectedOption}
                        loadOptions={this.loadOptions}
                        onInputChange={this.handleInputChange}
                    />

                    {/* Options Table */}
                    <TableContainer component={Paper} style={{ marginTop: '60px' }}>
                        <Table aria-label='simple table'>
                            <TableBody>
                            {options.map((option) => (
                                <TableRow key={option.cin}>
                                    <TableCell align='left'>{option.name}</TableCell>
                                    <TableCell align='right'>
                                        <Button 
                                            variant='contained'
                                            color='primary'
                                            onClick={() => {
                                                this.setState({ selectedOption: option })
                                                setTimeout(this.addEntry, 200)
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
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

export default Landing