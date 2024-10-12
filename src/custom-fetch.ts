import {getToken} from "@/app/actions";

export const customFetch = async <T>(
    url: string,
    options: RequestInit,
): Promise<T> => {

    const token = await getToken();

    console.log('### customFetch token', token);

    const customOptions: RequestInit = {
        ...options,
        headers: [["Authorization", `Bearer ${token}`]],
    };

    const request = new Request(url, customOptions);
    const response = await fetch(request);
    const data = await response.json();

    return { status: response.status, data } as T;
};