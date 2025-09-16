const ENDPOINTS = {
    auth: {
        sendOtp: () => `send-otp`,
        verifyOtp: () => `verify-otp`,
    },
    oauth: {
        google: () => 'oauth/google'
    },
    user: {
        checkEmail: () => `users/email-check`,
        me: () => `users/me`,
    },
    video: {
        getOneVideos: (id: string) => `videos/${id}`,
        getAllVideos: () => `videos/all/video`

    },
    socket: {
        chat: () => `/chat`,
    },
};
export default ENDPOINTS;