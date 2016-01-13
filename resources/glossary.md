## Main concepts

- Situations: list of all matching offers for the current browser session
- Offers: list of offers which are a matching context associated with alternatives
- Alternatives: A replacement for a need (part of an offer)
- Context: Browsing context for a web request (contains tabId, origin url, etc.)

## States tree

- MatchingTabs
    - TabId(int)
        - MatchingOffers
            - Offer
                - Alternatives
                    - Alternative
                        - Url
                        - Description
                - MatchingContext
                - Description
        - Context
- Offers
    - MatchingContext
    - Alternatives
        - Alternative
            - Url
            - Description
    - Description


