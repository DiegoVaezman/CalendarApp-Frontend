export const initialState = {
    status: 'checking',
    user: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated',
    user: { _id: '1234abc', name: 'Test' },
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: null,
    errorMessage: null,
};
