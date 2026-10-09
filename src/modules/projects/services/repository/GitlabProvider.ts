import { IRepositoryProvider, IRepositoryInfo } from './IRepositoryProvider';

export class GitlabProvider implements IRepositoryProvider {
  canHandle(url: string): boolean {
    return !!url && url.includes('gitlab.com');
  }

  private extractProjectPath(url: string) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.substring(1).replace(/\/$/, '');
    } catch {
      return null;
    }
  }

  async fetchReadme(url: string): Promise<string | null> {
    const projectPath = this.extractProjectPath(url);
    if (!projectPath) return null;
    
    const encodedPath = encodeURIComponent(projectPath);
    let response = await fetch(`https://gitlab.com/api/v4/projects/${encodedPath}/repository/files/README.md/raw?ref=main`);
    
    if (!response.ok) {
        response = await fetch(`https://gitlab.com/api/v4/projects/${encodedPath}/repository/files/README.md/raw?ref=master`);
        if (!response.ok) return null;
    }
    return response.text();
  }

  async fetchMetadata(url: string): Promise<IRepositoryInfo | null> {
    const projectPath = this.extractProjectPath(url);
    if (!projectPath) return null;

    const encodedPath = encodeURIComponent(projectPath);
    const response = await fetch(`https://gitlab.com/api/v4/projects/${encodedPath}`);

    if (!response.ok) return null;

    const data = await response.json();
    return {
      name: data.name,
      description: data.description || '',
      topics: data.tag_list || [],
      homepage: data.web_url || '',
    };
  }
}
