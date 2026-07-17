import { execSync } from 'node:child_process';

/**
 * Adds `gitLastAuthor` to each doc's frontmatter data, read from git commit
 * history — the name of whoever last committed changes to that file.
 * Pairs with Starlight's native `lastUpdated: true` (which handles the date
 * from the same git history) to show "who" alongside Starlight's "when".
 * Silently no-ops for files with no git history yet (e.g. a brand new,
 * uncommitted draft) rather than failing the build.
 */
export function remarkGitAuthor() {
  return (_tree, file) => {
    const filePath = file.history[0];
    if (!filePath) return;
    try {
      const out = execSync(`git log -1 --format=%an -- "${filePath}"`, {
        cwd: process.cwd(),
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (out) {
        file.data.astro.frontmatter.gitLastAuthor = out;
      }
    } catch {
      // Not a git repo, or file isn't committed yet — skip.
    }
  };
}

export default remarkGitAuthor;
