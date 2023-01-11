import {
    authSlice,
    clearErrorMessage,
    onLogin,
    onLogout,
    onChecking,
} from '../../../src/store/auth/authSlice';
import { initialState } from '../../fixtures/authStates';
import { testUser } from '../../fixtures/testUser';
import { authenticatedState } from '../../fixtures/authStates';

describe('Testing authSlice', () => {
    test('should return default state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('should do login', () => {
        const userData = {
            _id: testUser._id,
            name: testUser.name,
        };
        const state = authSlice.reducer(initialState, onLogin(userData));
        expect(state).toEqual({
            status: 'authenticated',
            user: userData,
            errorMessage: null,
        });
    });

    test('should do logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: null,
            errorMessage: null,
        });
    });

    test('should do logout with error message', () => {
        const errorMessage = 'test error message';
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: null,
            errorMessage: errorMessage,
        });
    });

    test('should do logout with error message', () => {
        const errorMessage = 'test error message';
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: null,
            errorMessage: errorMessage,
        });
    });

    test('should clean error message', () => {
        const errorMessage = 'test error message';
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );
        const newState = authSlice.reducer(state, clearErrorMessage());
        expect(newState.errorMessage).toBe(null);
    });

    test('should do checking', () => {
        const state = authSlice.reducer(authenticatedState, onChecking());
        expect(state).toEqual({
            status: 'checking',
            user: null,
            errorMessage: null,
        });
    });
});
