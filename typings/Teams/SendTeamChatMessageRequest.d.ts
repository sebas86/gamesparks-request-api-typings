declare namespace SparkRequests {
    /**
     * Send a message to all the players who are member of the given team
     */
    class SendTeamChatMessageRequest extends _Request<_SendTeamChatMessageResponse> {
        /**
         * The message to send
         * @Required No
         */
        message: string;
        /**
         * The team owner to find, used in combination with teamType. If not supplied the current players id will be used
         * @Required No
         */
        ownerId: string;
        /**
         * The teamId to find (may be null if teamType supplied)
         * @Required No
         */
        teamId: string;
        /**
         * The teamType to find, used in combination with the current player, or the player defined by ownerId
         * @Required No
         */
        teamType: string;
    }
    class _SendTeamChatMessageResponse extends _Response {
        /**
         * A JSON Map of any data added either to the Request or the Response by your Cloud Code
         */
        scriptData: ScriptData;
    }
}
