import { useQuery } from '@tanstack/react-query';
import { RepositoryFactory } from '../services/repository/RepositoryFactory';

export function useGithubReadme(repoUrl: string) {
  return useQuery({
    queryKey: ['repo_readme', repoUrl],
    queryFn: async () => {
      const provider = RepositoryFactory.getProvider(repoUrl);
      if (!provider) return null;
      return provider.fetchReadme(repoUrl);
    },
    enabled: !!repoUrl && !!RepositoryFactory.getProvider(repoUrl),
    staleTime: 10 * 60 * 1000,
    retry: 1
  });
}
