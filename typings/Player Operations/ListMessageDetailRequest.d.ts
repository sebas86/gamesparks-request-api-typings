declare namespace SparkRequests {
    /**
     * Returns the list of the current player’s messages / notifications.
     * The list only contains un-dismissed messages, to dismiss a message see DismissMessageRequest Read the section on Messages to see the complete list of messages and their meaning.
     */
    class ListMessageDetailRequest extends _Request<_ListMessageDetailResponse> {
        /**
         * The number of items to return in a page (default=50)
         * @Required No
         */
        entryCount: number;
        /**
         * An optional filter that limits the message types returned
         * @Required No
         */
        include: string;
        /**
         * The offset (page number) to start from (default=0)
         * @Required No
         */
        offset: number;
        /**
         * The status of messages to be retrieved. If omitted, messages of all statuses will be retrieved
         * @Required No
         */
        status: string;
    }
    class _ListMessageDetailResponse extends _Response {
        /**
         * A list of JSON objects containing player messages
         */
        messageList: PlayerMessage[];
        /**
         * A JSON Map of any data added either to the Request or the Response by your Cloud Code
         */
        scriptData: ScriptData;
    }
}
