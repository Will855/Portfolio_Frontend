import { IRepositoryProvider } from './IRepositoryProvider';
import { GithubProvider } from './GithubProvider';
import { GitlabProvider } from './GitlabProvider';

export class RepositoryFactory {
  // OCP: We can easily add new providers here without modifying the hooks.
  private static providers: IRepositoryProvider[] = [
    new GithubProvider(),
    new GitlabProvider(),
  ];

  static getProvider(url: string): IRepositoryProvider | null {
    if (!url) return null;
    for (const provider of this.providers) {
      if (provider.canHandle(url)) {
        return provider;
      }
    }
    return null; // Fallback or unsupported
  }
}
