## [2.2.1](https://github.com/insitu-project/recommendations-webextension/compare/v2.2.0...v2.2.1) (2019-05-31)


### Bug Fixes

* change semantic-release to bump before build ([eb9cf7a](https://github.com/insitu-project/recommendations-webextension/commit/eb9cf7a))

# [2.2.0](https://github.com/insitu-project/recommendations-webextension/compare/v2.1.0...v2.2.0) (2019-05-31)


### Features

* update version number ([5d35428](https://github.com/insitu-project/recommendations-webextension/commit/5d35428))

# [2.1.0](https://github.com/insitu-project/recommendations-webextension/compare/v2.0.0...v2.1.0) (2019-05-31)


### Bug Fixes

* **analytics:** revert Heap lib injection ([8208772](https://github.com/insitu-project/recommendations-webextension/commit/8208772))
* **badge:** only count notices to display and handle feedbacks on notice ([a8216d3](https://github.com/insitu-project/recommendations-webextension/commit/a8216d3)), closes [#285](https://github.com/insitu-project/recommendations-webextension/issues/285)
* **badge:** reset badge when a tab is created or updated ([b6551f5](https://github.com/insitu-project/recommendations-webextension/commit/b6551f5))
* **ContentTitle:** don't show empty tag if the title is empty, fix [#262](https://github.com/insitu-project/recommendations-webextension/issues/262) ([e5cfc35](https://github.com/insitu-project/recommendations-webextension/commit/e5cfc35))
* **details:** remove double spacings ([0ad6f86](https://github.com/insitu-project/recommendations-webextension/commit/0ad6f86))
* **Details:** changed read more url width ([6da174b](https://github.com/insitu-project/recommendations-webextension/commit/6da174b))
* **excerpt:** fix notice excerpt which could take 3 lines instead of 2 ([71d94bf](https://github.com/insitu-project/recommendations-webextension/commit/71d94bf))
* **external-click-handler:** don't close the UI when the user click on an interactive Html element ([d999de6](https://github.com/insitu-project/recommendations-webextension/commit/d999de6))
* **externalClickHandler:** check if document is already ready ([92531cd](https://github.com/insitu-project/recommendations-webextension/commit/92531cd))
* **feedback:** fix notice still shown on list after dismiss from details ([34a1aef](https://github.com/insitu-project/recommendations-webextension/commit/34a1aef))
* **heap:** fix heap declaration ([fd02740](https://github.com/insitu-project/recommendations-webextension/commit/fd02740))
* **notice:** handle HTML in message ([b33c1e2](https://github.com/insitu-project/recommendations-webextension/commit/b33c1e2))
* **Notice:** change excerpt text color ([c63302e](https://github.com/insitu-project/recommendations-webextension/commit/c63302e))
* **NoticeDetails:** make notice source optional, fix [#246](https://github.com/insitu-project/recommendations-webextension/issues/246) ([3e30985](https://github.com/insitu-project/recommendations-webextension/commit/3e30985))
* **notices:** correct <Notice/Details> props typing ([db4d960](https://github.com/insitu-project/recommendations-webextension/commit/db4d960))
* **notices:** revert REPORT_NOTICE action type deletion ([ea064e3](https://github.com/insitu-project/recommendations-webextension/commit/ea064e3))
* **notification:** fix import to require in script injection ([6f2d307](https://github.com/insitu-project/recommendations-webextension/commit/6f2d307))
* **notification:** Footer displayed twice ([3335bca](https://github.com/insitu-project/recommendations-webextension/commit/3335bca))
* **NotificationFooter:** revert to uncomplete nav links for apiv3 partial release ([f0014b6](https://github.com/insitu-project/recommendations-webextension/commit/f0014b6))
* bad imports ([90a3641](https://github.com/insitu-project/recommendations-webextension/commit/90a3641))
* **read:** fix read behavior ([a3de138](https://github.com/insitu-project/recommendations-webextension/commit/a3de138))
* **UI:** changed read more link design ([c376687](https://github.com/insitu-project/recommendations-webextension/commit/c376687))
* **UI:** changed read more link design ([269af49](https://github.com/insitu-project/recommendations-webextension/commit/269af49))
* change iFrame position ([9c0c097](https://github.com/insitu-project/recommendations-webextension/commit/9c0c097))
* changed opacity for read Bulle according to the design ([3f04d89](https://github.com/insitu-project/recommendations-webextension/commit/3f04d89))
* fix bad rebase ([cf78096](https://github.com/insitu-project/recommendations-webextension/commit/cf78096))
* read version directly from package.json, at build time ([0ac84b2](https://github.com/insitu-project/recommendations-webextension/commit/0ac84b2))


### Features

* adapt to API V3 ([63e24a9](https://github.com/insitu-project/recommendations-webextension/commit/63e24a9))
* **read:** Handle read status visually on a `Notice` ([3e8df34](https://github.com/insitu-project/recommendations-webextension/commit/3e8df34))
* added new button story ([c86fed3](https://github.com/insitu-project/recommendations-webextension/commit/c86fed3))
* **badge:** add badge on browser action button ([10b0d64](https://github.com/insitu-project/recommendations-webextension/commit/10b0d64))
* **badge:** store read notice in user `prefs` state slice ([55818ac](https://github.com/insitu-project/recommendations-webextension/commit/55818ac))
* **details:** change title to 'Détail de la bulle' ([6b2894e](https://github.com/insitu-project/recommendations-webextension/commit/6b2894e))
* **error-reporting:** add Sentry integration ([132fa77](https://github.com/insitu-project/recommendations-webextension/commit/132fa77))
* **list:** remove 'Add a recommendation' button when empty list ([e709fe0](https://github.com/insitu-project/recommendations-webextension/commit/e709fe0))
* **notice:** add an action when clicking on the source link of a notice and track it ([ec8e137](https://github.com/insitu-project/recommendations-webextension/commit/ec8e137))
* **notices:** change intention 'tip' to 'information' ([f7b2638](https://github.com/insitu-project/recommendations-webextension/commit/f7b2638))
* **ratings:** restore (dis)likes count on NoticeDetails ([501cac1](https://github.com/insitu-project/recommendations-webextension/commit/501cac1))
* **sentry:** condition Sentry logging and version declaring to yarn release ([20dfab5](https://github.com/insitu-project/recommendations-webextension/commit/20dfab5))
* **tab:** add `tabId` state slice to get `tabId` from content context ([c128fc4](https://github.com/insitu-project/recommendations-webextension/commit/c128fc4))
* **tracking:** don't track action explicitly tagged as `tracked: false` ([f76118e](https://github.com/insitu-project/recommendations-webextension/commit/f76118e))
* **ui:** show UI only if there ares unread notices ([212f205](https://github.com/insitu-project/recommendations-webextension/commit/212f205))
* **UI:** close the UI when clicking outside of the UI ([7f1e109](https://github.com/insitu-project/recommendations-webextension/commit/7f1e109))

# [2.0.0](https://github.com/insitu-project/recommendations-webextension/compare/v1.2.0...v2.0.0) (2019-03-08)


### Bug Fixes

* Active state on bulle screens ([91ddf0f](https://github.com/insitu-project/recommendations-webextension/commit/91ddf0f))
* add inline style to iframe to better fix positioning ([9217ddb](https://github.com/insitu-project/recommendations-webextension/commit/9217ddb))
* added a second Bulle in default list ([1c50a88](https://github.com/insitu-project/recommendations-webextension/commit/1c50a88))
* chanded ui Title size ([e5c1183](https://github.com/insitu-project/recommendations-webextension/commit/e5c1183))
* changed closed icon ([30af423](https://github.com/insitu-project/recommendations-webextension/commit/30af423))
* changed default background color ([b56dcf1](https://github.com/insitu-project/recommendations-webextension/commit/b56dcf1))
* changed feedbacks icons color ([a5b9faf](https://github.com/insitu-project/recommendations-webextension/commit/a5b9faf))
* changed logo ([3a76af3](https://github.com/insitu-project/recommendations-webextension/commit/3a76af3))
* corrected display of many bulles ([090e329](https://github.com/insitu-project/recommendations-webextension/commit/090e329))
* corrected indentation ([fe86058](https://github.com/insitu-project/recommendations-webextension/commit/fe86058))
* different background in notice context ([7627b1a](https://github.com/insitu-project/recommendations-webextension/commit/7627b1a))
* disable linter on logo ([8765b3c](https://github.com/insitu-project/recommendations-webextension/commit/8765b3c))
* don't try to inject in special tabs ([1cb47af](https://github.com/insitu-project/recommendations-webextension/commit/1cb47af))
* firefox buttons background color ([55cc696](https://github.com/insitu-project/recommendations-webextension/commit/55cc696))
* fix child instance checks ([6388e62](https://github.com/insitu-project/recommendations-webextension/commit/6388e62))
* handle content and options/popup styles loading differently ([5f49e35](https://github.com/insitu-project/recommendations-webextension/commit/5f49e35))
* hover effects ([fcc6759](https://github.com/insitu-project/recommendations-webextension/commit/fcc6759))
* improved header display ([4e0083d](https://github.com/insitu-project/recommendations-webextension/commit/4e0083d))
* init action not being forwarded to tab ([212f8b5](https://github.com/insitu-project/recommendations-webextension/commit/212f8b5))
* keep passed metas in background actions ([8aee6f5](https://github.com/insitu-project/recommendations-webextension/commit/8aee6f5))
* limited line width to 120char ([c94543d](https://github.com/insitu-project/recommendations-webextension/commit/c94543d))
* margins ([0aedb41](https://github.com/insitu-project/recommendations-webextension/commit/0aedb41))
* nav colors ([a1f49b4](https://github.com/insitu-project/recommendations-webextension/commit/a1f49b4))
* Notification not passing props to Bulle children ([59a1a18](https://github.com/insitu-project/recommendations-webextension/commit/59a1a18))
* Path not navigation component and some CS ([d34ae5b](https://github.com/insitu-project/recommendations-webextension/commit/d34ae5b))
* removed useless comment ([73d9f7e](https://github.com/insitu-project/recommendations-webextension/commit/73d9f7e))
* removed useless value ([9038dfe](https://github.com/insitu-project/recommendations-webextension/commit/9038dfe))
* resolves linter requests ([8c84cbe](https://github.com/insitu-project/recommendations-webextension/commit/8c84cbe))
* Set main component as an empty container ([b0723be](https://github.com/insitu-project/recommendations-webextension/commit/b0723be))
* source links have underline ([3fa52ad](https://github.com/insitu-project/recommendations-webextension/commit/3fa52ad))
* style not loading in options and popup ([c9cb394](https://github.com/insitu-project/recommendations-webextension/commit/c9cb394))
* **AddNoticeLink:** vertically centered ([3392537](https://github.com/insitu-project/recommendations-webextension/commit/3392537))
* **BackButton:** added cickable space ([25293e1](https://github.com/insitu-project/recommendations-webextension/commit/25293e1))
* **BackButton:** adding some padding ([ce051ff](https://github.com/insitu-project/recommendations-webextension/commit/ce051ff))
* **background:** fix contextTriggerFailure payload passing ([ceb0ea1](https://github.com/insitu-project/recommendations-webextension/commit/ceb0ea1))
* **background:** fix matchContextFailure payload passing ([ab17e8a](https://github.com/insitu-project/recommendations-webextension/commit/ab17e8a))
* **BulleContent:** corrected display ([e4d3a25](https://github.com/insitu-project/recommendations-webextension/commit/e4d3a25))
* **BulleContent:** corrected display of arrow ([b2bb9d9](https://github.com/insitu-project/recommendations-webextension/commit/b2bb9d9))
* **BulleContent:** replaced height by min-height ([003ca87](https://github.com/insitu-project/recommendations-webextension/commit/003ca87))
* **buttons:** new focus style applied to all buttons ([74dbe16](https://github.com/insitu-project/recommendations-webextension/commit/74dbe16))
* **buttons:** removed useless background property ([f18698f](https://github.com/insitu-project/recommendations-webextension/commit/f18698f))
* **colors:** replace color name ([7c23c10](https://github.com/insitu-project/recommendations-webextension/commit/7c23c10))
* **colors:** replace hex colors by props ([a4a925c](https://github.com/insitu-project/recommendations-webextension/commit/a4a925c))
* **config:** use reco2bulle transition backend origin ([9359cae](https://github.com/insitu-project/recommendations-webextension/commit/9359cae))
* **content:** prevent duplicate contentScript injection ([44a4e4e](https://github.com/insitu-project/recommendations-webextension/commit/44a4e4e))
* **Content:** changed OpenButton from link to div ([809571d](https://github.com/insitu-project/recommendations-webextension/commit/809571d))
* **details:** remove double spacings ([a373ba4](https://github.com/insitu-project/recommendations-webextension/commit/a373ba4))
* **DetailsMeta:** moved Contributor content to dedicated atom ([1b114af](https://github.com/insitu-project/recommendations-webextension/commit/1b114af))
* **DetailsMeta:** new design ([7a7d69f](https://github.com/insitu-project/recommendations-webextension/commit/7a7d69f))
* **dismiss button:** same vertical alignement on Chrome and Firefox ([8938134](https://github.com/insitu-project/recommendations-webextension/commit/8938134))
* **feedbacks:** removed underline, change svg direction ([a227c7f](https://github.com/insitu-project/recommendations-webextension/commit/a227c7f))
* **Feedbacks:** corrected linter error ([ced194b](https://github.com/insitu-project/recommendations-webextension/commit/ced194b))
* **Feedbacks:** test hover icons ([92cb521](https://github.com/insitu-project/recommendations-webextension/commit/92cb521))
* **feedbacks icons:** changed viewBox ([ead5282](https://github.com/insitu-project/recommendations-webextension/commit/ead5282))
* **fonts:** add `style-loader` to inject typeface css in head ([4c8f36b](https://github.com/insitu-project/recommendations-webextension/commit/4c8f36b))
* **iframe:** don't unmount content app on close ([92e9adf](https://github.com/insitu-project/recommendations-webextension/commit/92e9adf))
* **iframe:** go back to list on open ([05b55fe](https://github.com/insitu-project/recommendations-webextension/commit/05b55fe))
* **message:** color and line-height ([63b6414](https://github.com/insitu-project/recommendations-webextension/commit/63b6414))
* **nav:** corrected color variable value ([5eb6386](https://github.com/insitu-project/recommendations-webextension/commit/5eb6386))
* **nav:** same height on Chrome and Firefox ([d6e8226](https://github.com/insitu-project/recommendations-webextension/commit/d6e8226))
* **notice:** removed underline ([3365d01](https://github.com/insitu-project/recommendations-webextension/commit/3365d01))
* **Notice Content:** hover effect ([6339cdd](https://github.com/insitu-project/recommendations-webextension/commit/6339cdd))
* **openSaga:** show notices views when (re)open UI ([495a23e](https://github.com/insitu-project/recommendations-webextension/commit/495a23e))
* **tab:** execute content script on tab created/updated, not context match ([24fd7e4](https://github.com/insitu-project/recommendations-webextension/commit/24fd7e4))
* **tab:** remove old middleware that were sending duplicates messages to tab ([852e51a](https://github.com/insitu-project/recommendations-webextension/commit/852e51a))
* **tab sagas:** remove dead code ([261372b](https://github.com/insitu-project/recommendations-webextension/commit/261372b))
* **toolbar:** close the notification upon toolbar click, if already open ([0d607e6](https://github.com/insitu-project/recommendations-webextension/commit/0d607e6))
* **truncate:** handle number of characters and preserve words options ([8a7083c](https://github.com/insitu-project/recommendations-webextension/commit/8a7083c))
* **views:** bind webpackConfig env to pug template ([eb7f6a2](https://github.com/insitu-project/recommendations-webextension/commit/eb7f6a2)), closes [#243](https://github.com/insitu-project/recommendations-webextension/issues/243)
* **webpack:** handle css and fonts loading in lmem app ([2acf6b5](https://github.com/insitu-project/recommendations-webextension/commit/2acf6b5))
* whitespace removed by eslint ([7ff227e](https://github.com/insitu-project/recommendations-webextension/commit/7ff227e))


### Features

* add a sandbox context for testing and integration purpose ([344cc04](https://github.com/insitu-project/recommendations-webextension/commit/344cc04))
* add Bulle button display ([a657838](https://github.com/insitu-project/recommendations-webextension/commit/a657838))
* Add Error page on account and bulles ([27bd53f](https://github.com/insitu-project/recommendations-webextension/commit/27bd53f))
* Add Lato and sedgwick-ave typeface to the project ([28f6972](https://github.com/insitu-project/recommendations-webextension/commit/28f6972))
* add style-components stack ([4fd89af](https://github.com/insitu-project/recommendations-webextension/commit/4fd89af))
* added AddBulle display ([f99bc67](https://github.com/insitu-project/recommendations-webextension/commit/f99bc67))
* added font for logo ([c0e0cf7](https://github.com/insitu-project/recommendations-webextension/commit/c0e0cf7))
* added index for icons ([d95f71f](https://github.com/insitu-project/recommendations-webextension/commit/d95f71f))
* added transition on hover ([7e57bf5](https://github.com/insitu-project/recommendations-webextension/commit/7e57bf5))
* **About screen:** adapt integration to work with LMEM actual features ([3b89dae](https://github.com/insitu-project/recommendations-webextension/commit/3b89dae))
* **About screen:** added content ([2874139](https://github.com/insitu-project/recommendations-webextension/commit/2874139))
* **Account screen:** designed screen ([b6ada3e](https://github.com/insitu-project/recommendations-webextension/commit/b6ada3e))
* change notification background color depending on context ([9442e43](https://github.com/insitu-project/recommendations-webextension/commit/9442e43))
* **analytics:** add NOTICE_IGNORED action ([8298b1e](https://github.com/insitu-project/recommendations-webextension/commit/8298b1e))
* **Bulle detail:** create Bulle details display ([67c189c](https://github.com/insitu-project/recommendations-webextension/commit/67c189c))
* **components:** create a truncate text component and Js function ([91794f1](https://github.com/insitu-project/recommendations-webextension/commit/91794f1))
* **components:** integrate new components in lmem content app ([99c5a53](https://github.com/insitu-project/recommendations-webextension/commit/99c5a53))
* **context:** deduplicate notices when multiple triggers ([7d4451c](https://github.com/insitu-project/recommendations-webextension/commit/7d4451c))
* **Deleted Notice:** added button to cancel a deleted notice ([27c486a](https://github.com/insitu-project/recommendations-webextension/commit/27c486a))
* **details:** change title to 'Détail de la notification' ([0dac11f](https://github.com/insitu-project/recommendations-webextension/commit/0dac11f))
* Create NotificationFooter molecule ([fb08290](https://github.com/insitu-project/recommendations-webextension/commit/fb08290))
* **details:** remove approves/dislikes count from details ([7319f25](https://github.com/insitu-project/recommendations-webextension/commit/7319f25))
* **disliked detailed notice:** added content ([98df684](https://github.com/insitu-project/recommendations-webextension/commit/98df684))
* **Error:** error screen ([3f71a45](https://github.com/insitu-project/recommendations-webextension/commit/3f71a45))
* **external link:** add target blank by default and rel rules ([a7dd1b8](https://github.com/insitu-project/recommendations-webextension/commit/a7dd1b8))
* **failure-actions:** add failure actions in matching contexts ([56473bf](https://github.com/insitu-project/recommendations-webextension/commit/56473bf))
* **feedback:** add connected-react-router for navigation actions ([165f332](https://github.com/insitu-project/recommendations-webextension/commit/165f332))
* **feedback:** add justDismissed, justLiked and justDisliked props ([8ed989d](https://github.com/insitu-project/recommendations-webextension/commit/8ed989d))
* **feedbacks:** designed component ([989879b](https://github.com/insitu-project/recommendations-webextension/commit/989879b))
* **hasNotices:** add helper method `hasNotices` for later uses ([375cdc6](https://github.com/insitu-project/recommendations-webextension/commit/375cdc6))
* Implement menu navigation and routing ([745e030](https://github.com/insitu-project/recommendations-webextension/commit/745e030))
* **help screen:** added content ([e4c48aa](https://github.com/insitu-project/recommendations-webextension/commit/e4c48aa))
* **iframe:** add 'important' to all iframe style ([69b510a](https://github.com/insitu-project/recommendations-webextension/commit/69b510a))
* **integration:** added all kind of Bulles ([e4bbd2b](https://github.com/insitu-project/recommendations-webextension/commit/e4bbd2b))
* improved deleted Bulle display ([2b67bfc](https://github.com/insitu-project/recommendations-webextension/commit/2b67bfc))
* **language:** change all 'notification' terms to 'recommandation' ([77e9d87](https://github.com/insitu-project/recommendations-webextension/commit/77e9d87))
* **list:** Show notice icon as Other when given unknown type ([cd55c4e](https://github.com/insitu-project/recommendations-webextension/commit/cd55c4e))
* **loader:** display loading screen in privacy screen ([4f95407](https://github.com/insitu-project/recommendations-webextension/commit/4f95407))
* changes px to em ([0e8b76a](https://github.com/insitu-project/recommendations-webextension/commit/0e8b76a))
* **loading:** add <Loading > screen for 1 second before showing the app ([75c0620](https://github.com/insitu-project/recommendations-webextension/commit/75c0620))
* **loading:** show notification after 4s, only on production ([520e12d](https://github.com/insitu-project/recommendations-webextension/commit/520e12d))
* **Loading:** added loading screen ([df4ae1f](https://github.com/insitu-project/recommendations-webextension/commit/df4ae1f))
* **NoNotice screen:** added a screen in case of no displayed notice ([4a3769b](https://github.com/insitu-project/recommendations-webextension/commit/4a3769b))
* display all kind of notifications ([c29cd18](https://github.com/insitu-project/recommendations-webextension/commit/c29cd18))
* **notice:** allow notice content to be a link when not deleted ([87b450f](https://github.com/insitu-project/recommendations-webextension/commit/87b450f))
* Assemble Bulle and Notifications organisms from atoms and molecules ([c2b4f74](https://github.com/insitu-project/recommendations-webextension/commit/c2b4f74))
* beginning of dislike detailed notice ([6afd0de](https://github.com/insitu-project/recommendations-webextension/commit/6afd0de))
* beginning of new design ([183328d](https://github.com/insitu-project/recommendations-webextension/commit/183328d))
* change strategy used to load styles in the content context ([0eb91cb](https://github.com/insitu-project/recommendations-webextension/commit/0eb91cb))
* Create BulleType molecule to handle Bulle types dynamically ([6900678](https://github.com/insitu-project/recommendations-webextension/commit/6900678))
* created ExternalLink ([3f806ee](https://github.com/insitu-project/recommendations-webextension/commit/3f806ee))
* groups calls to components ([1b85c86](https://github.com/insitu-project/recommendations-webextension/commit/1b85c86))
* replaced inline SVG by components ([2d71ba5](https://github.com/insitu-project/recommendations-webextension/commit/2d71ba5))
* separate likes and dislikes actions ([57582b6](https://github.com/insitu-project/recommendations-webextension/commit/57582b6))
* **notice:** remove title, use description instead ([92012eb](https://github.com/insitu-project/recommendations-webextension/commit/92012eb))
* **notice:** strip HTML from notices in list ([675ef5e](https://github.com/insitu-project/recommendations-webextension/commit/675ef5e))
* **subscriptions screen:** added content ([9948e5d](https://github.com/insitu-project/recommendations-webextension/commit/9948e5d))
* **tabs:** track open tabs in redux ([a36642d](https://github.com/insitu-project/recommendations-webextension/commit/a36642d))
* **type:** added new Type icons and colors ([d51e541](https://github.com/insitu-project/recommendations-webextension/commit/d51e541))
* **type:** Handle previous notice types with new icons and bgs ([1055fb0](https://github.com/insitu-project/recommendations-webextension/commit/1055fb0))
* **webpack:** handle views compilation via webpack ([4cd05a0](https://github.com/insitu-project/recommendations-webextension/commit/4cd05a0)), closes [#187](https://github.com/insitu-project/recommendations-webextension/issues/187)


### BREAKING CHANGES

* remove previous styles and all their references
remove the associated webpack style loaders

# [1.2.0](https://github.com/insitu-project/recommendations-webextension/compare/v1.1.1...v1.2.0) (2018-12-13)


### Bug Fixes

* handle content and options/popup styles loading differently ([59a86e7](https://github.com/insitu-project/recommendations-webextension/commit/59a86e7))
* style not loading in options and popup ([ec529cd](https://github.com/insitu-project/recommendations-webextension/commit/ec529cd))
* whitespace removed by eslint ([f0c9ffb](https://github.com/insitu-project/recommendations-webextension/commit/f0c9ffb))


### Features

* add style-components stack ([c255796](https://github.com/insitu-project/recommendations-webextension/commit/c255796))
* **MatchingContexts:** support exclude url regex ([1258730](https://github.com/insitu-project/recommendations-webextension/commit/1258730))

## [1.1.1](https://github.com/insitu-project/recommendations-webextension/compare/v1.1.0...v1.1.1) (2018-10-19)


### Bug Fixes

* **refresh Matching Contexts:** schedule refresh after editor/criterion update ([f447c88](https://github.com/insitu-project/recommendations-webextension/commit/f447c88))

# [1.1.0](https://github.com/insitu-project/recommendations-webextension/compare/v1.0.3...v1.1.0) (2018-10-18)


### Bug Fixes

* **analytics:** track properties and drop irevelant actions ([2a2936a](https://github.com/insitu-project/recommendations-webextension/commit/2a2936a))
* **matching contexts:** auto refresh matching contexts from backend every x minutes ([82b37ce](https://github.com/insitu-project/recommendations-webextension/commit/82b37ce)), closes [#178](https://github.com/insitu-project/recommendations-webextension/issues/178)
* **popup:** add link to know where and when the addon shows up ([2062fb8](https://github.com/insitu-project/recommendations-webextension/commit/2062fb8))


### Features

* **popup:** bootstrap browser popup with react+redux (wip) ([b09782f](https://github.com/insitu-project/recommendations-webextension/commit/b09782f))
* **popup:** simple content with analytics ([7455240](https://github.com/insitu-project/recommendations-webextension/commit/7455240))

## [1.0.3](https://github.com/insitu-project/recommendations-webextension/compare/v1.0.2...v1.0.3) (2018-09-21)


### Bug Fixes

* **analytics:** track properties and drop irevelant actions ([59b9bc0](https://github.com/insitu-project/recommendations-webextension/commit/59b9bc0))

## [1.0.2](https://github.com/insitu-project/recommendations-webextension/compare/v1.0.1...v1.0.2) (2018-09-07)


### Bug Fixes

* **onboarding:** open onboarding page on installation ([e3a692b](https://github.com/insitu-project/recommendations-webextension/commit/e3a692b))

## [1.0.1](https://github.com/insitu-project/recommendations-webextension/compare/v1.0.0...v1.0.1) (2018-09-07)


### Bug Fixes

* **manifest:** add geoloc permission for parity with legacy extension ([26d293a](https://github.com/insitu-project/recommendations-webextension/commit/26d293a))
* **manifest:** set name to _Le Même en Mieux_ instead of _LMEM_ ([727a7a9](https://github.com/insitu-project/recommendations-webextension/commit/727a7a9))
