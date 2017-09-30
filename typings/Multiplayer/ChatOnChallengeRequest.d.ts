declare namespace SparkRequests {
    /**
     * Sends a message to all players involved in the challenge. The current player must be involved in the challenge for the message to be sent.
     * As the message is sent to all players, the current player will also see details of the message in the response. Read the section on response message aggregation for a description of this.
     */
    class ChatOnChallengeRequest extends _Request<_ChatOnChallengeResponse> {
        /**
         * The ID of the challenge
         */
        challengeInstanceId: string;
        /**
         * An optional message to send with the challenge
         */
        message: string;
    }
    class _ChatOnChallengeResponse extends _Response {
        /**
         * The ID of the challenge
         */
        challengeInstanceId: string;
        /**
         * An optional message to send with the challenge
         */
        message: string;
    }
}
