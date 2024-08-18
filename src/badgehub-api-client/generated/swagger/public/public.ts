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

/**
 * Get list of devices (badges)
 */
export type getDevicesResponse = {
  data: Device[];
  status: number;
}

export const getGetDevicesUrl = () => {


  return `https://api-staging.badgehub.nl/api/v3/devices`
}

export const getDevices = async ( options?: RequestInit): Promise<getDevicesResponse> => {
  
  const res = await fetch(getGetDevicesUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


/**
 * Get list of categories
 */
export type getCategoriesResponse = {
  data: Category[];
  status: number;
}

export const getGetCategoriesUrl = () => {


  return `https://api-staging.badgehub.nl/api/v3/categories`
}

export const getCategories = async ( options?: RequestInit): Promise<getCategoriesResponse> => {
  
  const res = await fetch(getGetCategoriesUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


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

  return normalizedParams.size ? `https://api-staging.badgehub.nl/api/v3/apps?${normalizedParams.toString()}` : `https://api-staging.badgehub.nl/api/v3/apps`
}

export const getApps = async (params?: GetAppsParams, options?: RequestInit): Promise<getAppsResponse> => {
  
  const res = await fetch(getGetAppsUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


/**
 * Get app details
 */
export type getAppDetailsResponse = {
  data: AppDetails;
  status: number;
}

export const getGetAppDetailsUrl = (slug: string,) => {


  return `https://api-staging.badgehub.nl/api/v3/apps/${slug}`
}

export const getAppDetails = async (slug: string, options?: RequestInit): Promise<getAppDetailsResponse> => {
  
  const res = await fetch(getGetAppDetailsUrl(slug),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


