/* eslint-disable camelcase, @typescript-eslint/camelcase */
import Tracker, {
  ContentImpression,
  ContentInteraction,
  OutboundLink,
  PageView,
  TrackingEvent
} from '../../libs/types/Tracker';
import uniqId from '../../libs/utils/uniqId';
import { buildQueryString } from '../../apps/extension/src/apps/background/api/call';

export interface RequiredTrackingParameters {
  idsite: number; // The ID of the website we're tracking a visit/action for.
  rec: 1; // Required for tracking, must be set to one, eg, &rec=1.
}

export interface OptionalTrackingParameters {
  // Recommended parameters
  action_name?: string; // The title of the action being tracked. It is possible to use slashes / to set one or several categories for this action. For example, Help / Feedback will create the Action Feedback in the category Help.
  url?: string; // The full URL for the current action.
  _id?: string; // The unique visitor ID, must be a 16 characters hexadecimal string. Every unique visitor must be assigned a different ID and this ID must not change after it is assigned. If this value is not set Matomo (formerly Piwik) will still track visits, but the unique visitors metric might be less accurate.
  rand?: string; // Meant to hold a random value that is generated before each request. Using it helps avoid the tracking request being cached by the browser or a proxy.
  apiv?: 1; // The parameter &apiv=1 defines the api version to use (currently always set to 1)

  // Optional User info
  urlref?: string; // The full HTTP Referrer URL. This value is used to determine how someone got to your website (ie, through a website, search engine or campaign).
  _cvar?: string; // Visit scope custom variables. This is a JSON encoded string of the custom variable array (see below for an example value).
  // _idvc — The current count of visits for this visitor. To set this value correctly, it would be required to store the value for each visitor in your application (using sessions or persisting in a database). Then you would manually increment the counts by one on each new visit or "session", depending on how you choose to define a visit. This value is used to populate the report Visitors > Engagement > Visits by visit number.
  // _viewts — The UNIX timestamp of this visitor's previous visit. This parameter is used to populate the report Visitors > Engagement > Visits by days since last visit.
  // _idts — The UNIX timestamp of this visitor's first visit. This could be set to the date where the user first started using your software/app, or when he/she created an account. This parameter is used to populate the Goals > Days to Conversion report.
  // _rcn — The Campaign name (see Tracking Campaigns). Used to populate the Referrers > Campaigns report. Note: this parameter will only be used for the first pageview of a visit.
  // _rck — The Campaign Keyword (see Tracking Campaigns). Used to populate the Referrers > Campaigns report (clicking on a campaign loads all keywords for this campaign). Note: this parameter will only be used for the first pageview of a visit.
  // res — The resolution of the device the visitor is using, eg 1280x1024.
  // h — The current hour (local time).
  // m — The current minute (local time).
  // s — The current second (local time).
  // plugins used by the visitor can be specified by setting the following parameters to 1: fla (Flash), java (Java), dir (Director), qt (Quicktime), realp (Real Player), pdf (PDF), wma (Windows Media), gears (Gears), ag (Silverlight).
  // cookie — when set to 1, the visitor's client is known to support cookies.
  //
  // ua — An override value for the User-Agent HTTP header field. The user agent is used to detect the operating system and browser used.
  //
  // lang — An override value for the Accept-Language HTTP header field. This value is used to detect the visitor's country if GeoIP is not enabled.
  uid?: string; // defines the User ID for this request. User ID is any non-empty unique string identifying the user (such as an email address or an username). To access this value, users must be logged-in in your system so you can fetch this user ID from your system, and pass it to Matomo. The User ID appears in the visits log, the Visitor profile, and you can Segment reports for one or several User ID (userId segment). When specified, the User ID will be "enforced". This means that if there is no recent visit with this User ID, a new one will be created. If a visit is found in the last 30 minutes with your specified User ID, then the new action will be recorded to this existing visit.
  // cid — defines the visitor ID for this request. You must set this value to exactly a 16 character hexadecimal string (containing only characters 01234567890abcdefABCDEF). We recommended setting the User ID via uid rather than use this cid.
  // new_visit — If set to 1, will force a new visit to be created for this action. This feature is also available in JavaScript.

  // dimension[0-999] — A Custom Dimension value for a specific Custom Dimension ID (requires Matomo 2.15.1 + Custom Dimensions plugin see the Custom Dimensions guide). If Custom Dimension ID is 2 use dimension2=dimensionValue to send a value for this dimension. The configured Custom Dimension has to be in scope "Visit".
  // Optional Action info (measure Page view, Outlink, Download, Site search)
  // cvar — Page scope custom variables. This is a JSON encoded string of the custom variable array (see below for an example value).
  link?: string; // An external URL the user has opened. Used for tracking outlink clicks. We recommend to also set the url parameter to this same value.
  // download — URL of a file the user has downloaded. Used for tracking downloads. We recommend to also set the url parameter to this same value.
  // search — The Site Search keyword. When specified, the request will not be tracked as a normal pageview but will instead be tracked as a Site Search request.
  // search_cat — when search is specified, you can optionally specify a search category with this parameter.
  // search_count — when search is specified, we also recommend setting the search_count to the number of search results displayed on the results page. When keywords are tracked with &search_count=0 they will appear in the "No Result Search Keyword" report.
  pv_id?: string; // Accepts a six character unique ID that identifies which actions were performed on a specific page view. When a page was viewed, all following tracking requests (such as events) during that page view should use the same pageview ID. Once another page was viewed a new unique ID should be generated. Use [0-9a-Z] as possible characters for the unique ID.
  // idgoal — If specified, the tracking request will trigger a conversion for the goal of the website being tracked with this ID.
  // revenue — A monetary value that was generated as revenue by this goal conversion. Only used if idgoal is specified in the request.
  // gt_ms — The amount of time it took the server to generate this action, in milliseconds. This value is used to process the Page speed report Avg. generation time column in the Page URL and Page Title reports, as well as a site wide running average of the speed of your server. Note: when using the JavaScript tracker this value is set to the time for server to generate response + the time for client to download response.
  // cs — The charset of the page being tracked. Specify the charset if the data you send to Matomo is encoded in a different character set than the default utf-8.
  // dimension[0-999] — A Custom Dimension value for a specific Custom Dimension ID (requires Matomo 2.15.1 + Custom Dimensions plugin see the Custom Dimensions guide). If Custom Dimension ID is 2 use dimension2=dimensionValue to send a value for this dimension. The configured Custom Dimension has to be in scope "Action".

  // Optional Event Tracking info
  e_c?: string; // The event category. Must not be empty. (eg. Videos, Music, Games...)
  e_a?: string; // The event action. Must not be empty. (eg. Play, Pause, Duration, Add Playlist, Downloaded, Clicked...)
  e_n?: string; // The event name. (eg. a Movie name, or Song name, or File name...)
  e_v?: number; // The event value. Must be a float or integer value (numeric), not a string.
  // Note: Trailing and leading whitespaces will be trimmed from parameter values for e_c, e_a and e_n.
  // Strings filled with whitespaces will be considered as (invalid) empty values.

  // Optional Content Tracking info
  c_n?: string; // The name of the content. For instance 'Ad Foo Bar'
  c_p?: string; // The actual content piece. For instance the path to an image, video, audio, any text
  c_t?: string; // The target of the content. For instance the URL of a landing page
  c_i?: string; // The name of the interaction with the content. For instance a 'click'
  // To track a content impression set c_n and optionally c_p and c_t.
  // To track a content interaction set c_i and c_n and optionally c_p and c_t.
  // To map an interaction to an impression make sure to set the same value for c_n and c_p. It is recommended to set a value for c_p.

  // Optional Ecommerce info
  // Use the following values to record a cart and/or an ecommerce order.
  //
  // you must set &idgoal=0 in the request to track an ecommerce interaction: cart update or an ecommerce order.
  // ec_id — The unique string identifier for the ecommerce order (required when tracking an ecommerce order)
  // ec_items — Items in the Ecommerce order. This is a JSON encoded array of items. Each item is an array with the following info in this order:
  //
  //     item sku (required),
  // item name (or if not applicable, set it to an empty string),
  // item category (or if not applicable, set it to an empty string),
  // item price (or if not applicable, set it to 0),
  // item quantity (or if not applicable, set it to 1).
  // An example value of ec_items would be: %5B%5B%22item1%20SKU%22%2C%22item1%20name%22%2C%22item1%20category%22%2C11.1111%2C2%5D%2C%5B%22item2%20SKU%22%2C%22item2%20name%22%2C%22%22%2C0%2C1%5D%5D (URL decoded version is: [["item1 SKU","item1 name","item1 category",11.1111,2],["item2 SKU","item2 name","",0,1]]).
  //
  // revenue — The grand total for the ecommerce order (required when tracking an ecommerce order)
  // ec_st — The sub total of the order; excludes shipping.
  // ec_tx — Tax Amount of the order
  // ec_sh — Shipping cost of the Order
  // ec_dt — Discount offered
  // _ects — The UNIX timestamp of this customer's last ecommerce order. This value is used to process the "Days since last order" report.

  // Other parameters (require authentication via token_auth)
  // The following parameters require that you set &token_auth= to the token_auth value of the Super User, or a user with write or admin permission to the website visits are being tracked for.
  //
  // token_auth — 32 character authorization key used to authenticate the API request. We recommend to create a user specifically for accessing the Tracking API, and give the user only write permission on the website(s).
  // cip — Override value for the visitor IP (both IPv4 and IPv6 notations supported).
  // cdt — Override for the datetime of the request (normally the current time is used). This can be used to record visits and page views in the past. The expected format is either a datetime such as: 2011-04-05 00:11:42 (remember to URL encode the value!), or a valid UNIX timestamp such as 1301919102. The datetime must be sent in UTC timezone. Note: if you record data in the past, you will need to force Matomo to re-process reports for the past dates. If you set cdt to a datetime older than 24 hours then token_auth must be set. If you set cdt with a datetime in the last 24 hours then you don't need to pass token_auth.
  // country — An override value for the country. Should be set to the two letter country code of the visitor (lowercase), eg fr, de, us.
  // region — An override value for the region. Should be set to the two letter region code as defined by MaxMind's GeoIP databases. See here for a list of them for every country (the region codes are located in the second column, to the left of the region name and to the right of the country code).
  // city — An override value for the city. The name of the city the visitor is located in, eg, Tokyo.
  // lat — An override value for the visitor's latitude, eg 22.456.
  // long — An override value for the visitor's longitude, eg 22.456.

  // Media Analytics parameters
  // Analytics for your Media content (video players and audio players) can be recorded using the premium Media Analytics plugin's HTTP Tracking API parameters.
  //
  // Activity and consumption of your videos and audios can be measured via the parameters ma_id, ma_ti, ma_re, ma_mt , ma_pn, ma_st, ma_le, ma_ps, ma_ttp, ma_w, ma_h, ma_fs, ma_se.
  //
  // Learn more in the Media Analytics HTTP Tracking API Reference.

  // Queued Tracking parameters
  // Queued Tracking can scale your large traffic Matomo (Piwik) service by queuing tracking requests in Redis or Mysql for better performance and reliability when you experience peaks.
  //
  // queuedtracking — When set to 0 (zero), the queued tracking handler won't be used and instead the tracking request will be executed directly. This can be useful when you need to debug a tracking problem or want to test that the tracking works in general.

  // Other parameters
  // send_image — If set to 0 (send_image=0) Matomo will respond with a HTTP 204 response code instead of a GIF image. This improves performance and can fix errors if images are not allowed to be obtained directly (eg Chrome Apps). Available since Matomo 2.10.0
  // ping — If set to 1 (ping=1), the request will be a Heartbeat request which will not track any new activity (such as a new visit, new action or new goal). The heartbeat request will only update the visit's total time to provide accurate "Visit duration" metric.
}

export type TrackingParameters = RequiredTrackingParameters &
  OptionalTrackingParameters;

export default class MatomoTracker implements Tracker {
  private readonly siteId: number | string;
  private readonly trackerUrl: string;
  private pageViewId?: string;
  public userId?: string;
  public tosAccepted?: boolean;

  constructor(siteId: number | string, trackerUrl: string) {
    this.siteId = siteId;
    this.trackerUrl = trackerUrl;
  }

  track = (parameters: OptionalTrackingParameters) => {
    return fetch(
      `${this.trackerUrl}${buildQueryString({
        idsite: this.siteId,
        pv_id: this.pageViewId,
        apiv: 1,
        r: MatomoTracker.uniqId(),
        rec: 1,
        _id: this.userId,
        uid: this.userId,
        _cvar: JSON.stringify({
          1: ['CGU acceptées', this.tosAccepted ? 'oui' : 'non']
        }),
        ...parameters
      } as TrackingParameters)}`
    );
  };

  trackEvent = ({ category, action, name, value, url }: TrackingEvent) => {
    return this.track({
      e_c: category,
      e_a: action,
      e_n: name,
      e_v: value,
      url
    });
  };

  trackPageView = ({ url, title, referrer }: PageView) => {
    this.pageViewId = MatomoTracker.uniqId().substr(2, 8);

    return this.track({
      url,
      action_name: title,
      urlref: referrer
    });
  };

  trackContentImpression = ({
    name,
    piece,
    target,
    url
  }: ContentImpression) => {
    return this.track({
      c_n: name,
      c_p: piece,
      c_t: target,
      url
    });
  };

  trackContentInteraction = ({
    name,
    piece,
    target,
    interaction,
    url
  }: ContentInteraction) => {
    return this.track({
      c_n: name,
      c_p: piece,
      c_t: target,
      c_i: interaction,
      url
    });
  };

  trackOutboundLink = ({ url }: OutboundLink) => {
    return this.track({
      link: url
    });
  };

  static uniqId() {
    return uniqId();
  }
}
