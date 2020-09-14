import React, { Component, Fragment } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import "regenerator-runtime/runtime.js";   //to enable the use of async

import TokenActionButtons from './Components/TokenActionButtons';
import TokenIndicator from './Components/TokenIndicator';
import UserList from './Components/UserList';
import ErrorMessageBar from './Components/ErrorMessageBar';

import MeetingServiceProvider from './Context/MeetingServiceProvider';
import StatusRefresher from './Components/StatusRefresher';
import Constants from './Constants';

microsoftTeams.initialize();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentToken: null,
            userToken: {
                number: null,
                status: Constants.MeetingTokenStatus.NotUsed
            },
            user: {
                oid: "",
                name: "",
                isOrganizer: false,
            },
            participants: [],
            error: {
                status: false,
                msg: "",
            }
        };

        this.setErrorFactory = (msg) => ({ status: true, msg });
        this.clearErrorFactory = () => ({ status: false, msg: "" });

        this.setError = (msg) => this.setState({ error: this.setErrorFactory(msg) });
    }

    onGetToken = ({ success, msg }) => {
        if (!success) {
            this.setError(msg);
            return;
        }
        this.setState({
            user: { oid: msg.UserInfo.AadObjectId, name: msg.UserInfo.Name, isOrganizer: msg.UserInfo.Role.MeetingRole === Constants.MeetingRoles.Organizer },
            userToken: { number: msg.TokenNumber, status: msg.Status || Constants.MeetingTokenStatus.NotUsed },
            error: this.clearErrorFactory()
        });
    }

    onAckToken = ({ success, msg }) => {
        this._updateDashboard(success, msg);
    }

    onSkipToken = ({ success, msg }) => {
        this._updateDashboard(success, msg);
    }

    onStatusRefresh = ({ success, msg }) => {
        this._updateDashboard(success, msg);
    }

    onUserInfoFetched = ({ success, msg }) => {
        if (!success) {
            this.setError(msg);
            return;
        }
        this.setState({
            user: { oid: msg.AadObjectId, name: msg.Name, isOrganizer: msg.Role.MeetingRole === Constants.MeetingRoles.Organizer },
            error: this.clearErrorFactory()
        });
    }

    render() {
        return (
            <Fragment>
                <MeetingServiceProvider>
                    <StatusRefresher onStatusRefresh={this.onStatusRefresh} />
                    <div className="app-container">
                        <ErrorMessageBar msg={this.state.error.msg} show={this.state.error.status} />
                        <TokenIndicator show={true} value={this.state.participants.length && this.state.currentToken} title={"Current Token"} />
                        <TokenActionButtons isOrganizer={this.state.user.isOrganizer}
                            onGetToken={this.onGetToken}
                            onAckToken={this.onAckToken}
                            onSkipToken={this.onSkipToken}
                            onUserInfoFetched={this.onUserInfoFetched}
                            showTokenButton={!this.state.userToken.number}
                            showDoneButton={!!this.state.userToken.number}
                            showSkipButton={!!this.state.participants.length}
                        />
                        <TokenIndicator
                            value={this.state.userToken.number}
                            show={!!this.state.userToken.number}
                            title={`Your Token: ${this.state.userToken.status}`}
                        />
                    </div>
                    <UserList items={this.state.participants} />
                </MeetingServiceProvider>
            </Fragment>
        );
    }

    _updateDashboard(success, data) {
        if (!success) {
            this.setError(data);
            return;
        }
        const { MeetingMetadata: { CurrentToken }, UserTokens: participants } = data;
        const currentUser = participants.find(participant => participant.UserInfo.AadObjectId === this.state.user.oid) || {};
        this.setState({
            currentToken: CurrentToken,
            participants,
            userToken: {
                number: currentUser.TokenNumber,
                status: currentUser.Status || Constants.MeetingTokenStatus.NotUsed
            },
            error: this.clearErrorFactory(),
        });
    }
}

export default App;