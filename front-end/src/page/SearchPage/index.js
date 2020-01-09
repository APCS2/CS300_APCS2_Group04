import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../component/header/header'
import queryString from 'query-string'
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MangaArray from '../../component/MangaArray/index'
import _ from 'lodash'
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
    uri: 'http://localhost:8000/graphql',
});

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props)
        const { params } = props.match
        const values = queryString.parse(this.props.location.search)
        const text = values.query
        this.state = {
            text: text,
            success: false,
            searchResult: [],
            isLoading: false
        }
    }
    componentWillReceiveProps(props) {
        const values = queryString.parse(props.location.search)
        const text = values.query
        this.setState({
            text: text,
            success: false,
            searchResult: [],
            isLoading: false
        }, () => this.fetchData())
    }

    componentDidMount() {
        console.log(this.state.text)
        this.fetchData()
    }

    getError = (error) => {
        if (error == "Mangas does not exist") {
          return 'Mangas Not Found'
        }
        return 'Server Unavailable'
    }

    fetchData = () => {
        const { text } = this.state
        this.setState({ isLoading: true })
        fetch({
            query: `query Search($text: String!) {
                searchManga(text: $text) {
                    title
                    thumbnail
                    alias
                    chapters {
                        index
                        title
                    }
                }
            }`,
            variables: { text: text }
        }).then(res => {
            const data = _.get(res, 'data', {})
            const searchResult = _.get(data, 'searchManga', []) 
            if (data) {
                this.setState({
                    searchResult,
                    success: true,
                })
            }
            else {
                this.setState({
                    success: false
                })
            }
        }).then(() => {
            this.setState({ isLoading: false })
        })
    }
    render() {
        const { success, searchResult, isLoading } = this.state
        return (
          <Grid container xs={12} justify="center">
            <Header/>
            {
                isLoading? <h3>Loading...</h3>:
              success
              ? <Grid container xs={12} justify="center">
                <Grid container xs={10}>
                  <MangaArray arrayTitle="Search Result" mangaArray={searchResult} />
                </Grid>
              </Grid>
              : <Grid container xs={10}>
                <Typography variant="h5" component="h3">
                  Server Unavailable
                </Typography>
              </Grid>
            }
          </Grid>
        );
    }
}