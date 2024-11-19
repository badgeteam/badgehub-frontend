/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */
import type {
  Badge,
  Category,
  GetAppsParams,
  Project,
  Uint8Array
} from '../../models'

/**
 * Get list of devices (badges)
 */
export type getDevicesResponse = {
  data: Badge[];
  status: number;
}

export const getGetDevicesUrl = () => {


  return `http://localhost:8081/api/v3/devices`
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


  return `http://localhost:8081/api/v3/categories`
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
 * Get list of apps, optionally limited by page start/length and/or filtered by categorySlug
 */
export type getAppsResponse = {
  data: Project[];
  status: number;
}

export const getGetAppsUrl = (params?: GetAppsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:8081/api/v3/apps?${normalizedParams.toString()}` : `http://localhost:8081/api/v3/apps`
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
export type getAppResponse = {
  data: Project;
  status: number;
}

export const getGetAppUrl = (slug: string,) => {


  return `http://localhost:8081/api/v3/apps/${slug}`
}

export const getApp = async (slug: string, options?: RequestInit): Promise<getAppResponse> => {
  
  const res = await fetch(getGetAppUrl(slug),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


/**
 * get the latest published version of a file in the project
 */
export type getLatestPublishedFileResponse = {
  data: Uint8Array;
  status: number;
}

export const getGetLatestPublishedFileUrl = (slug: string,
    filePath: string,) => {


  return `http://localhost:8081/api/v3/apps/${slug}/files/latest/${filePath}`
}

export const getLatestPublishedFile = async (slug: string,
    filePath: string, options?: RequestInit): Promise<getLatestPublishedFileResponse> => {
  
  const res = await fetch(getGetLatestPublishedFileUrl(slug,filePath),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


/**
 * get a file for a specific version of the project
 */
export type getFileForVersionResponse = {
  data: Uint8Array;
  status: number;
}

export const getGetFileForVersionUrl = (slug: string,
    revision: number,
    filePath: string,) => {


  return `http://localhost:8081/api/v3/apps/${slug}/files/rev${revision}/${filePath}`
}

export const getFileForVersion = async (slug: string,
    revision: number,
    filePath: string, options?: RequestInit): Promise<getFileForVersionResponse> => {
  
  const res = await fetch(getGetFileForVersionUrl(slug,revision,filePath),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


/**
 * get the app zip for a specific version of the project
 */
export type getZipForVersionResponse = {
  data: Uint8Array;
  status: number;
}

export const getGetZipForVersionUrl = (slug: string,
    revision: number,) => {


  return `http://localhost:8081/api/v3/apps/${slug}/zip/rev${revision}`
}

export const getZipForVersion = async (slug: string,
    revision: number, options?: RequestInit): Promise<getZipForVersionResponse> => {
  
  const res = await fetch(getGetZipForVersionUrl(slug,revision),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}


