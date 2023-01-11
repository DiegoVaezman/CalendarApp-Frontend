import calendarApi from '../../src/api/calendarApi';

describe('Testing calendarApi', () => {
    test('must have the default configuration', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('must have the x-token header in all requests', async () => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', 'ABC-123-XYZ');
        try {
            const res = await calendarApi.post('/auth', {
                email: 'test@test.com',
                password: '123456',
            });
            expect(res.config.headers['x-token']).toBe(token);
        } catch (error) {
            console.log(error.response.data);
        }
    });
});
