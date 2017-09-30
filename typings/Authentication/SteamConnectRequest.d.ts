declare namespace SparkRequests {
    /**
     * Allows a Steam sessionTicket to be used as an authentication mechanism.
     * Once authenticated the platform can determine the current players details from the Steam platform and store them within GameSparks.
     * GameSparks will determine the player’s friends and whether any of them are currently registered with the game.
     * If the Steam user is already linked to a player, the current session will switch to the linked player.
     * If the current player has previously created an account using either DeviceAuthentictionRequest or RegistrationRequest AND the Steam user is not already registered with the game, the Steam user will be linked to the current player.
     * If the current player has not authenticated and the Steam user is not known, a new player will be created using the Steam details and the session will be authenticated against the new player.
     * If the Steam user is already known, the session will switch to being the previously created user.
     */
    class SteamConnectRequest extends _Request<_SteamConnectResponse> {
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
         * The hex encoded UTF-8 string representation of the ticket acquired calling the Steam SDKs GetAuthSessionTicket.
         */
        sessionTicket: string;
        /**
         * Indicates that the server should switch to the supplied profile if it isalready associated to a player. Defaults to false.
         */
        switchIfPossible: boolean;
        /**
         * Indicates that the associated players displayName should be kept in syn with this profile when it’s updated by the external provider.
         */
        syncDisplayName: boolean;
    }
    class _SteamConnectResponse extends _Response {
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
         * The hex encoded UTF-8 string representation of the ticket acquired calling the Steam SDKs GetAuthSessionTicket.
         */
        sessionTicket: string;
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
