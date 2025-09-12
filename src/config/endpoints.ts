const ENDPOINTS = {
    auth: {
        sendOtp: () => `send-otp`,
        verifyOtp: () => `verify-otp`,
    },
    oauth: {
        google: () => 'oauth/google'
    },
    user: {
        checkEmail: () => `user/email-check`,
        profileQuestions: (stepNumber: number) =>
            `admin/user-profile/questions?step_number=${stepNumber}`,
        me: () => `users/me`,
    },
    socket: {
        chat: () => `/chat`,
    },
};
export default ENDPOINTS;