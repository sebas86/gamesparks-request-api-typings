declare namespace SparkRequests {
    /**
     * Register this player for matchmaking, using the given skill and matchShortCode.
     * Players looking for a match using the same matchShortCode will be considered for a match, based on the matchConfig.
     * Each player must match the other for the match to be found.
     * If the matchShortCode points to a match with realtime enabled, in order to minimise latency, the location of Players and their proximity to one another takes precedence over their reciprocal skill values.
     */
    class MatchmakingRequest extends _Request<_MatchmakingResponse> {
        /**
         * The action to take on the already in-flight request for this match. Currently supported actions are: 'cancel’
         * @Required No
         */
        action: string;
        /**
         * The query that will be applied to the PendingMatch collection
         * @Required No
         */
        customQuery: JSON;
        /**
         * A JSON Map of any data that will be associated to the pending match
         * @Required No
         */
        matchData: JSON;
        /**
         * Optional. Players will be grouped based on the distinct value passed in here, only players in the same group can be matched together
         * @Required No
         */
        matchGroup: string;
        /**
         * The shortCode of the match type this player is registering for
         * @Required Yes
         */
        matchShortCode: string;
        /**
         * A JSON Map of any data that will be associated to this user in a pending match
         * @Required No
         */
        participantData: JSON;
        /**
         * The skill of the player looking for a match
         * @Required No
         */
        skill: number;
    }
    class _MatchmakingResponse extends _Response {
        /**
         * A JSON Map of any data added either to the Request or the Response by your Cloud Code
         */
        scriptData: ScriptData;
    }
}
