/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */
import type {
  App,
  AppDetails,
  Category,
  Device,
  GetAppsParams
} from '../../models'
import { customFetch } from '../../../../custom-fetch';

/**
 * Get list of devices (badges)
 */
export type getDevicesResponse = {
  data: Device[];
  status: number;
}

export const getGetDevicesUrl = () => {


  return `http://localhost:8001/api/v3/devices`
}

export const getDevices = async ( options?: RequestInit): Promise<getDevicesResponse> => {
  
  return customFetch<Promise<getDevicesResponse>>(getGetDevicesUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Get list of categories
 */
export type getCategoriesResponse = {
  data: Category[];
  status: number;
}

export const getGetCategoriesUrl = () => {


  return `http://localhost:8001/api/v3/categories`
}

export const getCategories = async ( options?: RequestInit): Promise<getCategoriesResponse> => {
  
  return customFetch<Promise<getCategoriesResponse>>(getGetCategoriesUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Get list of apps, optionally limited by page start/length and/or filtered by category
 */
export type getAppsResponse = {
  data: App[];
  status: number;
}

export const getGetAppsUrl = (params?: GetAppsParams,) => {

  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === null) {
      normalizedParams.append(key, 'null');
    } else if (value !== undefined) {
      normalizedParams.append(key, value.toString());
    }
  });

  return normalizedParams.size ? `http://localhost:8001/api/v3/apps?${normalizedParams.toString()}` : `http://localhost:8001/api/v3/apps`
}

export const getApps = async (params?: GetAppsParams, options?: RequestInit): Promise<getAppsResponse> => {
  
  return customFetch<Promise<getAppsResponse>>(getGetAppsUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Get app details
 */
export type getAppDetailsResponse = {
  data: AppDetails;
  status: number;
}

export const getGetAppDetailsUrl = (slug: string,) => {


  return `http://localhost:8001/api/v3/apps/${slug}`
}

export const getAppDetails = async (slug: string, options?: RequestInit): Promise<getAppDetailsResponse> => {
  
  return customFetch<Promise<getAppDetailsResponse>>(getGetAppDetailsUrl(slug),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


