/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickDBInsertUserExcludeKeyofDBInsertUserId {
  admin?: boolean;
  editor?: string;
  email: string;
  email_verified_at?: string;
  name: string;
  password: string;
  public?: boolean;
  remember_token?: string;
  show_projects?: boolean;
}