/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */

export interface User {
  admin: boolean;
  created_at: string;
  deleted_at?: string;
  editor: string;
  email: string;
  email_verified_at?: string;
  id: string;
  name: string;
  password: string;
  public: boolean;
  remember_token?: string;
  show_projects: boolean;
  updated_at: string;
}