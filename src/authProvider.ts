import type { AuthProvider } from "@refinedev/core";
import axios, { AxiosInstance } from "axios";

export const authProvider = (adminLoginPath: string, apiLoginPath: string, apiAuthCheckPath: string): AuthProvider  => {
    const httpClient: AxiosInstance = axios.create();
    return ({
        login: async ({username, email, password}) => {
            if ((username || email) && password) {
                try {
                    await httpClient.post(
                        apiLoginPath, //TODO from config
                        {
                            "username": username || email,
                            "password": password
                        },
                    );

                    return {
                        success: true,
                        redirectTo: "/",
                    };
                } catch (e: any) {
                    console.error(e);
                    return {
                        success: true,
                        redirectTo: adminLoginPath,
                    };
                }

            }

            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: "Invalid username or password",
                },
            };
        },
        logout: async () => {
            //TODO api call
            // localStorage.removeItem(TOKEN_KEY);
            return {
                success: true,
                redirectTo: adminLoginPath,
            };
        },
        check: async () => {
            try {
                const {data} = await httpClient.get(
                    apiAuthCheckPath,
                );
            } catch (e: any) {
                console.error(e);
                if (axios.isAxiosError(e)) {
                    return {
                        authenticated: false,
                        redirectTo: adminLoginPath,
                    };
                }


            }
            // const token = localStorage.getItem(TOKEN_KEY);
            // if (token) {
            //     return {
            //         authenticated: true,
            //     };
            // }

            return {
                authenticated: true,
                // redirectTo: "/login",
            };
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            // const token = localStorage.getItem(TOKEN_KEY);
            // if (token) {
            return {
                id: 1,
                name: "John Doe",
                // avatar: "https://i.pravatar.cc/300",
            };
            // }
            // return null;
        },
        onError: async (error) => {
            console.error(error);
            return {error};
        },
    });
};