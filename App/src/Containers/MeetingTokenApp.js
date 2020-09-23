import React, { Component, Fragment } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";


import ErrorMessageBar from '../Components/ErrorMessageBar';
import SidePanelPage from '../Pages/SidePanel';
import PreMeetingPage from '../Pages/PreMeeting';
import MeetingServiceProvider from '../Context/MeetingServiceProvider';
import ContextService from '../Service/Context';
import Constants from '../Constants';

class MeetingTokenApp extends Component {
    constructor(props) {
        super(props);
        this.getContext = new ContextService(microsoftTeams);
        this.state = {
            frameContext: Constants.FrameContexts.Initializing,
            error: {
                status: false,
                msg: "",
            }
        };
    }

    componentDidMount() {
        const { PreMeeting, SidePanel, Unknown } = Constants.FrameContexts;
        this.getContext()
            .then(context => {
                const frameContext = context.frameContext;
                if ([PreMeeting, SidePanel].includes(frameContext)) {
                    this.setState({
                        frameContext,
                    })
                    return;
                }
                return Promise.reject("Error: Please make sure to run the app within teams as a tab app");
            })
            .catch(msg => this.setState({
                error: {
                    status: true,
                    msg,
                }
            }));
    }

    selectPage(context = Constants.FrameContexts.Unknown) {
        const { SidePanel, PreMeeting } = Constants.FrameContexts;
        switch (context) {
            case SidePanel:
                return <SidePanelPage/>
        
            case PreMeeting:
                return <PreMeetingPage onError={msg => this.setState({ error: { status: true, msg}})}/>
        
            default:
                return null;
        }
    }

    render() {
        const { SidePanel } = Constants.FrameContexts;
        if (this.state.error.status) {
            return <ErrorMessageBar msg={this.state.error.msg} show={this.state.error.status} />
        }
        return (
            <Fragment>
                <MeetingServiceProvider>
                    {
                        this.selectPage(this.state.frameContext)
                    }
                </MeetingServiceProvider>
            </Fragment>
        );
    }
}

export default MeetingTokenApp;