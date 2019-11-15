export interface PageView {
  title: string;
  url: string;
  referrer?: string;
}

export interface TrackingEvent {
  category: string;
  action: string;
  name: string;
  value: number;
  url?: string;
}

export interface ContentImpression {
  name: string;
  piece: string;
  target?: string;
  url?: string;
}

export interface ContentInteraction extends ContentImpression {
  interaction: string;
}

export interface OutboundLink {
  url: string;
}

export default interface Tracker {
  userId?: string;
  trackPageView(pageView: PageView): void;
  trackEvent(trackingEvent: TrackingEvent): void;
  trackContentImpression(contentImpression: ContentImpression): void;
  trackContentInteraction(contentInteraction: ContentInteraction): void;
  trackOutboundLink(contentInteraction: OutboundLink): void;
}
