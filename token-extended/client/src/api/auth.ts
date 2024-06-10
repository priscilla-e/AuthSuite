import axiosClient from "../lib/axios-client";
import { User } from "../types";


export async function getCurrentUser(): Promise<User>{
    const response = await axiosClient.get('/auth/user')
    return response.data
}

export async function login(email: string, password: string): Promise<{
    user: User;
    access_token: string;
    msg: string;
}> {
    const response = await axiosClient.post('/auth/login', {
        email,
        password
    })
    return response.data
}

export async function register(email: string, password: string): Promise<{
    msg: string;
}> {
    const response = await axiosClient.post('/auth/register', {
        email,
        password
    })
    return response.data
}

export async function logout(): Promise<{msg: string}> {
    const response = await axiosClient.post('/auth/logout')
    return response.data
}
