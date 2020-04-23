import React from 'react';

const CineboxContext = React.createContext();

class CineboxProvider extends React.Component {
    state = {
        token: '',
        refresh: false,
    }

    setToken = (token) => {
        this.setState({ token });
    }

    setRefresh = (refresh) => {
        this.setState({ refresh });
    }

    render() {
        return (
            <CineboxContext.Provider
                value={{
                    token: this.state.token,
                    refresh: this.state.refresh,
                    setToken: this.setToken,
                    setRefresh: this.setRefresh
                }}
            >
                {this.props.children}
            </CineboxContext.Provider>
        )
    }
}

export {CineboxProvider, CineboxContext};