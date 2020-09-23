import ServiceConstants from './ServiceConstants'
import MeetingTokenStatus from './MeetingTokenStatus'
import MeetingRoles from './MeetingRoles'

export default Object.freeze({
    Service: ServiceConstants,
    Error: {
        timeout: 10000,
    },
    MeetingTokenStatus,
    MeetingRoles,
    FrameContexts: Object.freeze({
        PreMeeting: "content",
        SidePanel: "sidePanel",
        Initializing: "initializing",
        Unknown: "unknown",
    })
})