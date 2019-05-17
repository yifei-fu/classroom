import jwt from 'jsonwebtoken';
import {API_HOST, LOCAL_TOKEN_KEY} from './constant'
import { UserSignUpRequestBody } from './type';

export default class Auth {
    public static isSignedIn(): boolean {
        return !!this.getToken();
    }

    public static setToken(token: string | null) {
        if (!token) {
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        } else {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        }
    }

    public static tokenExpired(token: string): boolean {
        try {
            const decoded = jwt.decode(token, { json: true }) as { exp: number };
            return Date.now() / 1000 >= decoded.exp;
        } catch (err) {
            return true;
        }
    }

    public static getToken(): string | null {
        const token = localStorage.getItem(LOCAL_TOKEN_KEY);
        if (!token || this.tokenExpired(token)) {
            return null;
        }
        return token;
    }

    public static login(username: string, password: string) {
        return fetch(`${API_HOST}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(() => {
                throw new Error('Invalid authentication credentials provided.');
            });
        }).then((data) => {
            this.setToken(data.token);
        });
    }

    public static signUp(user: UserSignUpRequestBody) {
        return fetch(`${API_HOST}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(() => {
                throw new Error('Cannot sign up with the information provided.');
            });
        }).then((data) => {
            this.setToken(data.token);
        });
    }
}
