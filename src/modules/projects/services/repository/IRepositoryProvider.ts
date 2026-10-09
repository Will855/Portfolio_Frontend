export interface IRepositoryInfo {
  name: string;
  description: string;
  topics: string[];
  homepage: string;
}

export interface IRepositoryProvider {
  /** Checks if this provider can handle the given URL */
  canHandle(url: string): boolean;
  
  /** Fetches the README content in markdown */
  fetchReadme(url: string): Promise<string | null>;
  
  /** Fetches repository metadata for auto-filling */
  fetchMetadata(url: string): Promise<IRepositoryInfo | null>;
}
