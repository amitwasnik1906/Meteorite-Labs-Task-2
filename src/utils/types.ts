export interface Role {
    description: string;
    id: string;
    name: string;
    type: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role | null;
    confirmed: boolean;
    blocked: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}