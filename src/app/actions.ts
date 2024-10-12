'use server'

import {getApps, getCategories, getDevices} from "@/badgehub-api-client/generated/swagger/public/public";
import {GetAppsParams} from "@/badgehub-api-client/generated/models";

let token = "";


export async function getAppData(searchParams: GetAppsParams) {

    return Promise.all([
        getApps(searchParams),
        getCategories(),
        getDevices(),
    ]);
}

export async function setToken(tokenIn: string) {
    console.log('### setToken', tokenIn);

    token = tokenIn;
}

export async function getToken() {
    console.log('### getToken', token);

    return token;
}