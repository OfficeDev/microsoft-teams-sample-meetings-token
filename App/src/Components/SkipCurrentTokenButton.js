import React, { Component } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { withMeetingTokenService } from '../Context/MeetingServiceProvider';

class SkipCurrentTokenButton extends Component {
    skipToken = async () => {
        const { meetingTokenService } = this.props;
        const data = await meetingTokenService.skipTokenAsync();
        this.props.onSkipToken(data);
    }

    async componentDidMount() {
        const { meetingTokenService } = this.props;
        const data = await meetingTokenService.getUserInfoAsync();
        this.props.onUserInfoFetched(data);
    }

    render() {
        // This shows the "Skip" button only if the user has the Organizer role in the meeting
        // NOTE: You *must* also check the user role in the server-side API. Do not rely on the hidden UX alone to enforce role restrictions.
        return (
            <div className="flex-center" >
                {this.props.isOrganizer ?
                    (
                        <PrimaryButton style={{ margin: 10, backgroundColor:"darkred", borderColor:"darkred" }} title="Move current token to next" onClick={this.skipToken}>
                            Skip
                        </PrimaryButton>
                    ) : null
                }
            </div>
        );
    }
}

export default withMeetingTokenService(SkipCurrentTokenButton);