import { describe, expect, it } from 'vitest';
import {
  contributionBody,
  contributionSubject,
  noticeAdminUrl,
} from './ContributionEmail';

describe('subject of the contribution email', () => {
  it('announces a contribution and names its author', () => {
    expect(
      contributionSubject('DisMoi', {
        contributorName: 'Alice',
        question: false,
        recipientName: null,
      }),
    ).toBe('[DisMoi] New contribution from Alice');
  });

  it('announces a question naming nobody when it targets no contributor', () => {
    expect(
      contributionSubject('DisMoi', {
        contributorName: 'Alice',
        question: true,
        recipientName: null,
      }),
    ).toBe('[DisMoi] New question');
  });

  it('names the contributor a question is addressed to', () => {
    expect(
      contributionSubject('DisMoi', {
        contributorName: 'Alice',
        question: true,
        recipientName: 'Maarten',
      }),
    ).toBe('[DisMoi] New question to Maarten');
  });
});

describe('body of the contribution email', () => {
  it('renders the markup of the message literally instead of letting it be interpreted', () => {
    expect(
      contributionBody(
        '<a href="x">lien</a> & « guillemets » l\'apostrophe',
        'https://www.dismoi.io/admin/notices/12',
      ),
    ).toContain(
      '<p>&lt;a href=&quot;x&quot;&gt;lien&lt;/a&gt; &amp; « guillemets » l&#039;apostrophe</p>',
    );
  });

  it('attaches the editing link of the notice', () => {
    expect(
      contributionBody(
        'Un prix cassé',
        'https://www.dismoi.io/admin/notices/12',
      ),
    ).toContain('<a href="https://www.dismoi.io/admin/notices/12">Edit</a>');
  });
});

describe('address of a notice in the administration', () => {
  it('composes under the origin of the site, with no doubled slash', () => {
    expect(noticeAdminUrl('https://www.dismoi.io/', 12)).toBe(
      'https://www.dismoi.io/admin/notices/12',
    );
  });
});
