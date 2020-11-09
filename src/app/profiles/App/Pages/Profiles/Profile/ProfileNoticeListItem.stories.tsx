import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProfileNoticeListItem from './ProfileNoticeListItem';
import { generateStatefulNotice } from 'test/fakers/generateNotice';

storiesOf('Profile/ProfileNoticeListItem', module)
  .add('normal', () => (
    <ProfileNoticeListItem
      loading={false}
      notice={generateStatefulNotice()}
      seeInContext={action('seeInContext')}
    />
  ))
  .add('with a very long example URL', () => (
    <ProfileNoticeListItem
      loading={false}
      notice={generateStatefulNotice({
        exampleMatchingUrl:
          'http://www.seomofo.com/experiments/title-and-h1-of-this-post-but-for-the-sake-of-keyword-prominence-stuffing-im-going-to-mention-it-again-using-various-synonyms-stemmed-variations-and-of-coursea-big-fat-prominent-font-size-heres-the-stumper-that-stumped-me-what-is-the-max-number-of-chars-in-a-url-that-google-is-willing-to-crawl-and-index-for-whatever-reason-i-thought-i-had-read-somewhere-that-googles-limit-on-urls-was-255-characters-but-that-turned-out-to-be-wrong-so-maybe-i-just-made-that-number-up-the-best-answer-i-could-find-was-this-quote-from-googles-webmaster-trends-analyst-john-mueller-we-can-certainly-crawl-and-index-urls-over-1000-characters-long-but-that-doesnt-mean-that-its-a-good-practice-the-setup-for-this-experiment-is-going-to-be-pretty-simple-im-going-to-edit-the-permalink-of-this-post-to-be-really-really-long-then-im-going-to-see-if-google-indexes-it-i-might-even-see-if-yahoo-and-bing-index-iteven-though-no-one-really-cares-what-those-assholes-are-doing-url-character-limits-unrelated-to-google-the-question-now-is-how-many-characters-should-i-make-the-url-of-this-post-there-are-a-couple-of-sources-ill-reference-to-help-me-make-this-decision-the-first-is-this-quote-from-the-microsoft-support-pages-microsoft-internet-explorer-has-a-maximum-uniform-resource-locator-url-length-of-2083-characters-internet-explorer-also-has-a-maximum-path-length-of-2048-characters-this-limit-applies-to-both-post-request-and-get-request-urls-the-second-source-ill-cite-is-the-http-11-protocol-which-says-the-http-protocol-does-not-place-any-a-priori-limit-on-the-length-of-a-uri-servers-must-be-able-to-handle-the-uri-of-any-resource-they-serve-and-should-be-able-to-handle-uris-of-unbounded-length-if-they-provide-get-based-forms-that-could-generate-such-uris-a-server-should-return-414-request-uri-too-long-status-if-a-uri-is-longer.html'
      })}
      seeInContext={action('seeInContext')}
    />
  ));
