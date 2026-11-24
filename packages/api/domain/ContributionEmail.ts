export interface ContributionToAnnounce {
  readonly contributorName: string;
  readonly question: boolean;
  readonly recipientName: string | null;
}

export const contributionSubject = (
  instanceName: string,
  contribution: ContributionToAnnounce,
): string => {
  if (!contribution.question) {
    return `[${instanceName}] New contribution from ${contribution.contributorName}`;
  }

  return contribution.recipientName === null
    ? `[${instanceName}] New question`
    : `[${instanceName}] New question to ${contribution.recipientName}`;
};

const TWIG_ESCAPES: ReadonlyMap<string, string> = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#039;'],
]);

const escapeHtml = (text: string): string =>
  text.replace(
    /[&<>"']/g,
    (character) => TWIG_ESCAPES.get(character) ?? character,
  );

export const noticeAdminUrl = (siteOrigin: string, noticeId: number): string =>
  `${siteOrigin.replace(/\/+$/, '')}/admin/notices/${noticeId}`;

export const contributionBody = (message: string, noticeUrl: string): string =>
  `<html lang="fr"><body><p>${escapeHtml(message)}</p>` +
  `<a href="${escapeHtml(noticeUrl)}">Edit</a></body></html>`;
