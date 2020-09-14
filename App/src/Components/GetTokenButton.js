import React, { Component } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { withMeetingTokenService } from '../Context/MeetingServiceProvider';

class GetTokenButton extends Component {

    getToken = async () => {
        const { meetingTokenService } = this.props;
        const data = await meetingTokenService.getMeetingTokenAsync();
        this.props.onGetToken(data);
    }

    render() {
        return (
            <div className="flex-center">
                {this.props.show ?
                    (
                        <PrimaryButton style={{ margin: 10 }} title="Get your meeting token" onClick={this.getToken}>
                            Token
                        </PrimaryButton>
                    ) : null
                }
            </div>
        );
    }
}

export default withMeetingTokenService(GetTokenButton);