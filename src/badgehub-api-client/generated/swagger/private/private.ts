/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */
import type {
  ChangeDraftAppMetadata403,
  ChangeDraftAppMetadata404,
  DbInsertAppMetadataJSONPartial,
  DeleteDraftFile403,
  DeleteDraftFile404,
  DeleteProject403,
  DeleteProject404,
  GetDraftFile403,
  GetDraftFile404,
  GetDraftProject403,
  GetDraftProject404,
  GetUserDraftProjects403,
  GetUserDraftProjectsParams,
  PickCreateProjectPropsExcludeKeyofCreateProjectPropsSlugOrIdpUserId,
  PickProjectExcludeKeyofProjectVersion,
  Project,
  ProjectPropsPartial,
  ProjectSlug,
  PublishVersion403,
  PublishVersion404,
  UpdateProject403,
  UpdateProject404,
  WriteDraftFile403,
  WriteDraftFile404,
  WriteDraftFileBody
} from '../../models';

import { fetchWithBaseUrl } from '../../../../fetch-from-api';

/**
 * Create a new project
 */
export type createProjectResponse204 = {
  data: void
  status: 204
}
    
export type createProjectResponseComposite = createProjectResponse204;
    
export type createProjectResponse = createProjectResponseComposite & {
  headers: Headers;
}

export const getCreateProjectUrl = (slug: ProjectSlug,) => {


  

  return `/api/v3/projects/${slug}`
}

export const createProject = async (slug: ProjectSlug,
    pickCreateProjectPropsExcludeKeyofCreateProjectPropsSlugOrIdpUserId: PickCreateProjectPropsExcludeKeyofCreateProjectPropsSlugOrIdpUserId, options?: RequestInit): Promise<createProjectResponse> => {
  
  return fetchWithBaseUrl<createProjectResponse>(getCreateProjectUrl(slug),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      pickCreateProjectPropsExcludeKeyofCreateProjectPropsSlugOrIdpUserId,)
  }
);}


/**
 * Create a new project
 */
export type deleteProjectResponse204 = {
  data: void
  status: 204
}

export type deleteProjectResponse403 = {
  data: DeleteProject403
  status: 403
}

export type deleteProjectResponse404 = {
  data: DeleteProject404
  status: 404
}
    
export type deleteProjectResponseComposite = deleteProjectResponse204 | deleteProjectResponse403 | deleteProjectResponse404;
    
export type deleteProjectResponse = deleteProjectResponseComposite & {
  headers: Headers;
}

export const getDeleteProjectUrl = (slug: ProjectSlug,) => {


  

  return `/api/v3/projects/${slug}`
}

export const deleteProject = async (slug: ProjectSlug, options?: RequestInit): Promise<deleteProjectResponse> => {
  
  return fetchWithBaseUrl<deleteProjectResponse>(getDeleteProjectUrl(slug),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
);}


/**
 * Create a new project
 */
export type updateProjectResponse204 = {
  data: void
  status: 204
}

export type updateProjectResponse403 = {
  data: UpdateProject403
  status: 403
}

export type updateProjectResponse404 = {
  data: UpdateProject404
  status: 404
}
    
export type updateProjectResponseComposite = updateProjectResponse204 | updateProjectResponse403 | updateProjectResponse404;
    
export type updateProjectResponse = updateProjectResponseComposite & {
  headers: Headers;
}

export const getUpdateProjectUrl = (slug: ProjectSlug,) => {


  

  return `/api/v3/projects/${slug}`
}

export const updateProject = async (slug: ProjectSlug,
    projectPropsPartial: ProjectPropsPartial, options?: RequestInit): Promise<updateProjectResponse> => {
  
  return fetchWithBaseUrl<updateProjectResponse>(getUpdateProjectUrl(slug),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      projectPropsPartial,)
  }
);}


/**
 * Get all draft projects that the given user has access to.
 */
export type getUserDraftProjectsResponse200 = {
  data: PickProjectExcludeKeyofProjectVersion[]
  status: 200
}

export type getUserDraftProjectsResponse403 = {
  data: GetUserDraftProjects403
  status: 403
}
    
export type getUserDraftProjectsResponseComposite = getUserDraftProjectsResponse200 | getUserDraftProjectsResponse403;
    
export type getUserDraftProjectsResponse = getUserDraftProjectsResponseComposite & {
  headers: Headers;
}

export const getGetUserDraftProjectsUrl = (userId: string,
    params?: GetUserDraftProjectsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v3/users/${userId}/drafts?${stringifiedParams}` : `/api/v3/users/${userId}/drafts`
}

export const getUserDraftProjects = async (userId: string,
    params?: GetUserDraftProjectsParams, options?: RequestInit): Promise<getUserDraftProjectsResponse> => {
  
  return fetchWithBaseUrl<getUserDraftProjectsResponse>(getGetUserDraftProjectsUrl(userId,params),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Upload a file to the latest draft version of the project.
Note that the filePath needs to be url encoded.
 */
export type writeDraftFileResponse204 = {
  data: void
  status: 204
}

export type writeDraftFileResponse403 = {
  data: WriteDraftFile403
  status: 403
}

export type writeDraftFileResponse404 = {
  data: WriteDraftFile404
  status: 404
}
    
export type writeDraftFileResponseComposite = writeDraftFileResponse204 | writeDraftFileResponse403 | writeDraftFileResponse404;
    
export type writeDraftFileResponse = writeDraftFileResponseComposite & {
  headers: Headers;
}

export const getWriteDraftFileUrl = (slug: string,
    filePath: string,) => {


  

  return `/api/v3/projects/${slug}/draft/files/${filePath}`
}

export const writeDraftFile = async (slug: string,
    filePath: string,
    writeDraftFileBody: WriteDraftFileBody, options?: RequestInit): Promise<writeDraftFileResponse> => {
    const formData = new FormData();
formData.append('file', writeDraftFileBody.file)

  return fetchWithBaseUrl<writeDraftFileResponse>(getWriteDraftFileUrl(slug,filePath),
  {      
    ...options,
    method: 'POST'
    ,
    body: 
      formData,
  }
);}


/**
 * Delete the given file from the latest draft version of the project.
Note that the filePath needs to be url encoded.
Note that the metadata.json file cannot be deleted
 */
export type deleteDraftFileResponse204 = {
  data: void
  status: 204
}

export type deleteDraftFileResponse403 = {
  data: DeleteDraftFile403
  status: 403
}

export type deleteDraftFileResponse404 = {
  data: DeleteDraftFile404
  status: 404
}
    
export type deleteDraftFileResponseComposite = deleteDraftFileResponse204 | deleteDraftFileResponse403 | deleteDraftFileResponse404;
    
export type deleteDraftFileResponse = deleteDraftFileResponseComposite & {
  headers: Headers;
}

export const getDeleteDraftFileUrl = (slug: string,
    filePath: string,) => {


  

  return `/api/v3/projects/${slug}/draft/files/${filePath}`
}

export const deleteDraftFile = async (slug: string,
    filePath: string, options?: RequestInit): Promise<deleteDraftFileResponse> => {
  
  return fetchWithBaseUrl<deleteDraftFileResponse>(getDeleteDraftFileUrl(slug,filePath),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
);}


/**
 * get the latest draft version of the project.
 */
export type getDraftFileResponse200 = {
  data: string
  status: 200
}

export type getDraftFileResponse403 = {
  data: GetDraftFile403
  status: 403
}

export type getDraftFileResponse404 = {
  data: GetDraftFile404
  status: 404
}
    
export type getDraftFileResponseComposite = getDraftFileResponse200 | getDraftFileResponse403 | getDraftFileResponse404;
    
export type getDraftFileResponse = getDraftFileResponseComposite & {
  headers: Headers;
}

export const getGetDraftFileUrl = (slug: string,
    filePath: string,) => {


  

  return `/api/v3/projects/${slug}/draft/files/${filePath}`
}

export const getDraftFile = async (slug: string,
    filePath: string, options?: RequestInit): Promise<getDraftFileResponse> => {
  
  return fetchWithBaseUrl<getDraftFileResponse>(getGetDraftFileUrl(slug,filePath),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Change the metadata of the latest draft version of the project.
 */
export type changeDraftAppMetadataResponse204 = {
  data: void
  status: 204
}

export type changeDraftAppMetadataResponse403 = {
  data: ChangeDraftAppMetadata403
  status: 403
}

export type changeDraftAppMetadataResponse404 = {
  data: ChangeDraftAppMetadata404
  status: 404
}
    
export type changeDraftAppMetadataResponseComposite = changeDraftAppMetadataResponse204 | changeDraftAppMetadataResponse403 | changeDraftAppMetadataResponse404;
    
export type changeDraftAppMetadataResponse = changeDraftAppMetadataResponseComposite & {
  headers: Headers;
}

export const getChangeDraftAppMetadataUrl = (slug: string,) => {


  

  return `/api/v3/projects/${slug}/draft/metadata`
}

export const changeDraftAppMetadata = async (slug: string,
    dbInsertAppMetadataJSONPartial: DbInsertAppMetadataJSONPartial, options?: RequestInit): Promise<changeDraftAppMetadataResponse> => {
  
  return fetchWithBaseUrl<changeDraftAppMetadataResponse>(getChangeDraftAppMetadataUrl(slug),
  {      
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      dbInsertAppMetadataJSONPartial,)
  }
);}


/**
 * Get Project details of the draft version of the project
 */
export type getDraftProjectResponse200 = {
  data: Project
  status: 200
}

export type getDraftProjectResponse403 = {
  data: GetDraftProject403
  status: 403
}

export type getDraftProjectResponse404 = {
  data: GetDraftProject404
  status: 404
}
    
export type getDraftProjectResponseComposite = getDraftProjectResponse200 | getDraftProjectResponse403 | getDraftProjectResponse404;
    
export type getDraftProjectResponse = getDraftProjectResponseComposite & {
  headers: Headers;
}

export const getGetDraftProjectUrl = (slug: string,) => {


  

  return `/api/v3/projects/${slug}/draft`
}

export const getDraftProject = async (slug: string, options?: RequestInit): Promise<getDraftProjectResponse> => {
  
  return fetchWithBaseUrl<getDraftProjectResponse>(getGetDraftProjectUrl(slug),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}


/**
 * Publish the current draft as a new version
 */
export type publishVersionResponse204 = {
  data: void
  status: 204
}

export type publishVersionResponse403 = {
  data: PublishVersion403
  status: 403
}

export type publishVersionResponse404 = {
  data: PublishVersion404
  status: 404
}
    
export type publishVersionResponseComposite = publishVersionResponse204 | publishVersionResponse403 | publishVersionResponse404;
    
export type publishVersionResponse = publishVersionResponseComposite & {
  headers: Headers;
}

export const getPublishVersionUrl = (slug: string,) => {


  

  return `/api/v3/projects/${slug}/publish`
}

export const publishVersion = async (slug: string, options?: RequestInit): Promise<publishVersionResponse> => {
  
  return fetchWithBaseUrl<publishVersionResponse>(getPublishVersionUrl(slug),
  {      
    ...options,
    method: 'PATCH'
    
    
  }
);}


