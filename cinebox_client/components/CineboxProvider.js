import React from 'react';

const CineboxContext = React.createContext();

class CineboxProvider extends React.Component {
    state = {
        token: '',
        refresh: false,
        movie: {}
    }

    setToken = (token) => {
        this.setState({ token });
    }

    setRefresh = (refresh) => {
        this.setState({ refresh });
    }

    setMovie = (movie) => {
        this.setState({ movie });
    }

    render() {
        return (
            <CineboxContext.Provider
                value={{
                    token: this.state.token,
                    refresh: this.state.refresh,
                    setToken: this.setToken,
                    setRefresh: this.setRefresh,
                    movie: this.state.movie,
                    setMovie: this.setMovie,
                }}
            >
                {this.props.children}
            </CineboxContext.Provider>
        )
    }
}

export {CineboxProvider, CineboxContext};