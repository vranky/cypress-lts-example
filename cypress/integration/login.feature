Feature: Feature tests for lts login-page

  @smoke
  Scenario Outline: Valid Login to LTS platform
    Given user jump into lts login page
    When user enter a username "<userName>"
    And user enter a password "<password>"
    And user click on sign-in button
    Then user jumped into dashboard welcome page

    Examples:
      | userName                           | password  |
      | bergnaum_cs_test@cstesnotexist.com | Passw0rd! |

  @smoke
  Scenario Outline: Invalid Login to LTS platform
    Given user jump into lts login page
    When user enter a username "<userName>"
    And user enter a password "<password>"
    And user click on sign-in button
    Then invalid login warning message appeared with text "Invalid username or password"

    Examples:
      | userName                           | password |
      | bergnaum_cs_test@cstesnotexist.com | Passwdsf |
      | aerwsfsfad@cstesnotexist.com       | Passwdsf |

