import React, { Component } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { withMeetingTokenService } from '../Context/MeetingServiceProvider';

class DoneTokenButton extends Component {

    doneToken = async () => {
        const { meetingTokenService } = this.props;
        const data = await meetingTokenService.ackTokenAsync();
        this.props.onAckToken(data);
    }

    render() {
        return (
            <div className="flex-center" >
                {this.props.show ?
                    (
                        <PrimaryButton style={{ margin: 10,backgroundColor:"green", borderColor:"green" }} title="Acknowledge that you are done with the token" onClick={this.doneToken}>
                            Done
                        </PrimaryButton>
                    ) : null
                }
            </div>
        );
    }
}

export default withMeetingTokenService(DoneTokenButton);