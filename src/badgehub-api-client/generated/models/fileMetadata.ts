/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * badgehub-api
 * Node project for the BadgeHub API
 * OpenAPI spec version: 3
 */
import type { User } from './user';
import type { Version } from './version';

export interface FileMetadata {
  baseName: string;
  crc32: string;
  created_at: string;
  deleted_at?: string;
  editable?: boolean;
  extension: string;
  lintable?: boolean;
  mime?: string;
  name: string;
  size_formatted: string;
  size_of_content: number;
  updated_at: string;
  user: User;
  version: Version;
}