export interface RegisterData {
    email: string;
    fullName: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

// export interface LoginRes {
//     token: string;
//     email: string;
//     fullName: string;
//     imageName: string;
// }