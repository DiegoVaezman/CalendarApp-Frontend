import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import calendarApi from '../../src/api/calendarApi';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUser } from '../fixtures/testUser';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState },
        },
    });
};

describe('Testing useAuthStore', () => {
    beforeEach(() => localStorage.clear());

    test('should return default values', () => {
        const mockStore = getMockStore({
            ...initialState,
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: null,
            errorMessage: null,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });

    test('should startLogin do login', async () => {
        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin('test@test.com', '123456');
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { _id: '63bd844397c2071a066898fb', name: 'test' },
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(
            expect.any(String)
        );
    });

    test('should startLogin fail at authentication', async () => {
        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin('fail@test.com', '123456');
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: null,
        });
        expect(localStorage.getItem('token')).toBe(null);

        await waitFor(() => expect(result.current.errorMessage).toBe(null));
    });

    test('should startRegister create user', async () => {
        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                _id: '1234abc',
                name: 'test user',
                token: 'token-123456',
            },
        });

        await act(async () => {
            await result.current.startRegister(
                'newtestuser',
                'newtestuser@test.com',
                '123456'
            );
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { _id: '1234abc', name: 'test user' },
        });

        spy.mockRestore();
    });

    test('should startRegister fail creating user', async () => {
        const mockStore = getMockStore({
            ...notAuthenticatedState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startRegister(
                'test',
                'test@test.com',
                '123456'
            );
        });
        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: null,
        });
    });

    test('should checkAuthToken fail if no token', async () => {
        const mockStore = getMockStore({
            ...initialState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'not-authenticated',
            user: null,
        });
    });

    test('should checkAuthToken authenticate user if token', async () => {
        const { data } = await calendarApi.post('/auth', testUser);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({
            ...initialState,
        });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { _id: '63bd844397c2071a066898fb', name: 'test' },
        });
    });
});
