declare namespace SparkRequests {
    /**
     * Allows a Twitter account to be used as an authentication mechanism.
     * Once authenticated the platform can determine the current players details from the Twitter platform and store them within GameSparks.
     * GameSparks will determine the player’s friends and whether any of them are currently registered with the game.
     * If the Twitter user is already linked to a player, the current session will switch to the linked player.
     * If the current player has previously created an account using either DeviceAuthentictionRequest or RegistrationRequest AND the Twitter user is not already registered with the game, the Twitter user will be linked to the current player.
     * If the current player has not authenticated and the Twitter user is not known, a new player will be created using the Twitter details and the session will be authenticated against the new player.
     * If the Twitter user is already known, the session will switch to being the previously created user.
     */
    class TwitterConnectRequest extends _Request<_TwitterConnectResponse> {
        /**
         * The accessSecret is obtained at the same time as the accessToken, and is required to sign requests to Twitter’s services that require the accessToken.
         */
        accessSecret: string;
        /**
         * The accessToken represents a player’s permission to share access to their account with your application.
         */
        accessToken: string;
        /**
         * Indicates that the server should not try to link the external profile with the current player.  If false, links the external profile to the currently signed in player.  If true, creates a new player and links the external profile to them.  Defaults to false.
         */
        doNotLinkToCurrentPlayer: boolean;
        /**
         * Indicates whether the server should return an error if an account switch would have occurred, rather than switching automatically.  Defaults to false.
         */
        errorOnSwitch: boolean;
        /**
         * An optional segment configuration for this request.
         */
        segments: JSON;
        /**
         * Indicates that the server should switch to the supplied profile if it isalready associated to a player. Defaults to false.
         */
        switchIfPossible: boolean;
        /**
         * Indicates that the associated players displayName should be kept in syn with this profile when it’s updated by the external provider.
         */
        syncDisplayName: boolean;
    }
    class _TwitterConnectResponse extends _Response {
        /**
         * The accessSecret is obtained at the same time as the accessToken, and is required to sign requests to Twitter’s services that require the accessToken.
         */
        accessSecret: string;
        /**
         * The accessToken represents a player’s permission to share access to their account with your application.
         */
        accessToken: string;
        /**
         * Indicates that the server should not try to link the external profile with the current player.  If false, links the external profile to the currently signed in player.  If true, creates a new player and links the external profile to them.  Defaults to false.
         */
        doNotLinkToCurrentPlayer: boolean;
        /**
         * Indicates whether the server should return an error if an account switch would have occurred, rather than switching automatically.  Defaults to false.
         */
        errorOnSwitch: boolean;
        /**
         * An optional segment configuration for this request.
         */
        segments: JSON;
        /**
         * Indicates that the server should switch to the supplied profile if it isalready associated to a player. Defaults to false.
         */
        switchIfPossible: boolean;
        /**
         * Indicates that the associated players displayName should be kept in syn with this profile when it’s updated by the external provider.
         */
        syncDisplayName: boolean;
    }
}
