/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */
import type {
  DbInsertAppMetadataJSONPartial,
  ProjectProps,
  ProjectPropsPartial,
  ProjectSlug,
  Uint8Array,
  UserProps,
  WriteDraftFileBody
} from '../../models'
import { fetchWithBaseUrl } from '../../../../fetch-from-api';

/**
 * Create a new app
 */
export type createAppResponse = {
  data: void;
  status: number;
}

export const getCreateAppUrl = (slug: ProjectSlug,) => {


  return `/api/v3/apps/${slug}`
}

export const createApp = async (slug: ProjectSlug,
    projectProps: ProjectProps, options?: RequestInit): Promise<createAppResponse> => {
  
  return fetchWithBaseUrl<Promise<createAppResponse>>(getCreateAppUrl(slug),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      projectProps,)
  }
);}


/**
 * Create a new app
 */
export type deleteAppResponse = {
  data: void;
  status: number;
}

export const getDeleteAppUrl = (slug: ProjectSlug,) => {


  return `/api/v3/apps/${slug}`
}

export const deleteApp = async (slug: ProjectSlug, options?: RequestInit): Promise<deleteAppResponse> => {
  
  return fetchWithBaseUrl<Promise<deleteAppResponse>>(getDeleteAppUrl(slug),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
);}


/**
 * Create a new app
 */
export type updateAppResponse = {
  data: void;
  status: number;
}

export const getUpdateAppUrl = (slug: ProjectSlug,) => {


  return `/api/v3/apps/${slug}`
}

export const updateApp = async (slug: ProjectSlug,
    projectPropsPartial: ProjectPropsPartial, options?: RequestInit): Promise<updateAppResponse> => {
  
  return fetchWithBaseUrl<Promise<updateAppResponse>>(getUpdateAppUrl(slug),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      projectPropsPartial,)
  }
);}


/**
 * get the latest draft version of the app in zip format
 */
export type getLatestPublishedZipResponse = {
  data: Uint8Array;
  status: number;
}

export const getGetLatestPublishedZipUrl = (slug: string,) => {


  return `/api/v3/apps/${slug}/draft/zip`
}

export const getLatestPublishedZip = async (slug: string, options?: RequestInit): Promise<getLatestPublishedZipResponse> => {
  
  return fetchWithBaseUrl<Promise<getLatestPublishedZipResponse>>(getGetLatestPublishedZipUrl(slug),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Create a new user
 */
export type insertUserResponse = {
  data: void;
  status: number;
}

export const getInsertUserUrl = (userId: number,) => {


  return `/api/v3/users/${userId}`
}

export const insertUser = async (userId: number,
    userProps: UserProps, options?: RequestInit): Promise<insertUserResponse> => {
  
  return fetchWithBaseUrl<Promise<insertUserResponse>>(getInsertUserUrl(userId),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      userProps,)
  }
);}


/**
 * Upload a file to the latest draft version of the project.
 */
export type writeDraftFileResponse = {
  data: void;
  status: number;
}

export const getWriteDraftFileUrl = (slug: string,
    filePath: string,) => {


  return `/api/v3/apps/${slug}/draft/files/${filePath}`
}

export const writeDraftFile = async (slug: string,
    filePath: string,
    writeDraftFileBody: WriteDraftFileBody, options?: RequestInit): Promise<writeDraftFileResponse> => {
    const formData = new FormData();
formData.append('file', writeDraftFileBody.file)

  return fetchWithBaseUrl<Promise<writeDraftFileResponse>>(getWriteDraftFileUrl(slug,filePath),
  {      
    ...options,
    method: 'POST'
    ,
    body: 
      formData,
  }
);}


/**
 * get the latest draft version of the project.
 */
export type getDraftFileResponse = {
  data: string;
  status: number;
}

export const getGetDraftFileUrl = (slug: string,
    filePath: string,) => {


  return `/api/v3/apps/${slug}/draft/files/${filePath}`
}

export const getDraftFile = async (slug: string,
    filePath: string, options?: RequestInit): Promise<getDraftFileResponse> => {
  
  return fetchWithBaseUrl<Promise<getDraftFileResponse>>(getGetDraftFileUrl(slug,filePath),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Change the metadata of the latest draft version of the project.
 */
export type changeDraftAppMetadataResponse = {
  data: void;
  status: number;
}

export const getChangeDraftAppMetadataUrl = (slug: string,) => {


  return `/api/v3/apps/${slug}/draft/metadata`
}

export const changeDraftAppMetadata = async (slug: string,
    dbInsertAppMetadataJSONPartial: DbInsertAppMetadataJSONPartial, options?: RequestInit): Promise<changeDraftAppMetadataResponse> => {
  
  return fetchWithBaseUrl<Promise<changeDraftAppMetadataResponse>>(getChangeDraftAppMetadataUrl(slug),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      dbInsertAppMetadataJSONPartial,)
  }
);}


/**
 * Upload a file to the latest draft version of the project.
 */
export type writeZipResponse = {
  data: void;
  status: number;
}

export const getWriteZipUrl = (slug: string,) => {


  return `/api/v3/apps/${slug}/draft/zip`
}

export const writeZip = async (slug: string,
    uint8Array: Uint8Array, options?: RequestInit): Promise<writeZipResponse> => {
  
  return fetchWithBaseUrl<Promise<writeZipResponse>>(getWriteZipUrl(slug),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      uint8Array,)
  }
);}


/**
 * Publish the latest draft version
 */
export type publishVersionResponse = {
  data: void;
  status: number;
}

export const getPublishVersionUrl = (slug: string,) => {


  return `/api/v3/apps/${slug}/publish`
}

export const publishVersion = async (slug: string, options?: RequestInit): Promise<publishVersionResponse> => {
  
  return fetchWithBaseUrl<Promise<publishVersionResponse>>(getPublishVersionUrl(slug),
  {      
    ...options,
    method: 'PATCH'
    
    
  }
);}


