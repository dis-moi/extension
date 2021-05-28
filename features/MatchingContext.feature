Feature: Matching context
  In order to read relevant notice
  As a user
  I want to see notices that match my current tab context

  Scenario: yarnpkg.com while following Maarten
    Given I am following "Maarten"
    When I open the url "https://classic.yarnpkg.com/en/docs/pnp/"
    Then I see the notification within 30 seconds
    And The first notice has text "Les développeurs de Malt expliquent pourquoi et comment"
