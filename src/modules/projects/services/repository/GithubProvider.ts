import { IRepositoryProvider, IRepositoryInfo } from './IRepositoryProvider';

export class GithubProvider implements IRepositoryProvider {
  canHandle(url: string): boolean {
    return !!url && url.includes('github.com');
  }

  private extractOwnerRepo(url: string) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.replace(/\/$/, '');
      const [, owner, repo] = pathname.split('/');
      return { owner, repo };
    } catch {
      return null;
    }
  }

  async fetchReadme(url: string): Promise<string | null> {
    const info = this.extractOwnerRepo(url);
    if (!info || !info.owner || !info.repo) return null;

    const response = await fetch(`https://api.github.com/repos/${info.owner}/${info.repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('No se pudo obtener el README de GitHub');
    }
    return response.text();
  }

  async fetchMetadata(url: string): Promise<IRepositoryInfo | null> {
    const info = this.extractOwnerRepo(url);
    if (!info || !info.owner || !info.repo) return null;

    const response = await fetch(`https://api.github.com/repos/${info.owner}/${info.repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      name: data.name,
      description: data.description || '',
      topics: data.topics || [],
      homepage: data.homepage || '',
    };
  }
}
