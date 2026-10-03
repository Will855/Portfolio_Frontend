import { useQuery } from '@tanstack/react-query';

const GITHUB_OWNER = 'Will855';
const REPO_NAME = 'knowledge-base'; // Podemos cambiar esto si le pone otro nombre

export interface GithubNode {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir';
}

export function useGithubNotesTree(path: string = '') {
  return useQuery({
    queryKey: ['github-notes-tree', path],
    queryFn: async (): Promise<GithubNode[]> => {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${REPO_NAME}/contents/${path}`);
      if (!res.ok) throw new Error('Error fetching tree');
      const data = await res.json();
      return Array.isArray(data) ? data : [data];
    },
    staleTime: 1000 * 60 * 60, // 1 hora de caché
  });
}

export function useGithubNoteContent(path: string) {
  return useQuery({
    queryKey: ['github-note-content', path],
    queryFn: async (): Promise<string> => {
      const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_OWNER}/${REPO_NAME}/main/${path}`);
      if (!res.ok) throw new Error('Error fetching note content');
      return await res.text();
    },
    enabled: !!path && path !== '',
    staleTime: 1000 * 60 * 60,
  });
}
