import { useQuery } from '@tanstack/react-query';

export function useGithubReadme(repoUrl: string) {
  return useQuery({
    queryKey: ['github_readme', repoUrl],
    queryFn: async () => {
      if (!repoUrl || !repoUrl.includes('github.com')) return null;
      
      const urlObj = new URL(repoUrl);
      const pathname = urlObj.pathname.replace(/\/$/, '');
      const [, owner, repo] = pathname.split('/');
      
      if (!owner || !repo) return null;

      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
        },
      });

      if (!response.ok) {
        if (response.status === 404) return null; // Sin README
        throw new Error('No se pudo obtener el README');
      }

      return response.text();
    },
    enabled: !!repoUrl && repoUrl.includes('github.com'),
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 1
  });
}
