import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get all quotes for user.
     */
    getQuotes?: string | OccEndpoint;

    /**
     * Request a quote.
     */
    createQuote?: string | OccEndpoint;

    /**
     * Get a specific quote.
     */
    getQuote?: string | OccEndpoint;

    /**
     * Edit the quote.
     */
    editQuote?: string | OccEndpoint;

    /**
     * Perform workflow actions with the quote.
     */
    performActionQuote?: string | OccEndpoint;

    /**
     * Add a comment to a quote.
     */
    addComment?: string | OccEndpoint;

    /**
     * Apply a discount to an existing quote.
     */
    addDicount?: string | OccEndpoint;

    /**
     * Add a comment to a line item of a quote.
     */
    addCartEntryComment?: string | OccEndpoint;
  }
}
