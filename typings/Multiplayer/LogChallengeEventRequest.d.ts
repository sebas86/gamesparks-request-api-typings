declare namespace SparkRequests {
    /**
     * Allows a user defined event to be triggered. The event will be posted to the challenge specified.
     * This call differs from most as it does not have a fixed format. The @class, challengeInstanceId and eventKey attributes are common, but the rest of the attributes are as defined in the Event object configured in the dev portal.
     * The example below shows a request to en event with a short code of HS with 2 attributes, 'HS’ & 'GL’.
     */
    class LogChallengeEventRequest extends _Request<_LogChallengeEventResponse> {
        /**
         * The ID challenge instance to target
         * @Required Yes
         */
        challengeInstanceId: string;
        /**
         * The short code of the event to trigger
         * @Required Yes
         */
        eventKey: string;
    }
    class _LogChallengeEventResponse extends _Response {
        /**
         * A JSON Map of any data added either to the Request or the Response by your Cloud Code
         */
        scriptData: ScriptData;
    }
}
