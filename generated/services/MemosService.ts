/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralUpsertOutputSerial } from '../models/GeneralUpsertOutputSerial';
import type { Memos } from '../models/Memos';
import type { Pagination } from '../models/Pagination';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MemosService {
    /**
     * List memos
     * Retrieve a list of memos with optional filtering and sorting.
     * @param tag
     * @param page
     * @param limit
     * @returns any A list of memos
     * @throws ApiError
     */
    public static listMemos(
        tag?: Array<string>,
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<Memos>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/memos',
            query: {
                'tag': tag,
                'page': page,
                'limit': limit,
            },
            errors: {
                404: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Create memo
     * Create a new memo.
     * @param requestBody Memo creation payload
     * @returns any Memo created successfully
     * @throws ApiError
     */
    public static createMemo(
        requestBody: {
            content: string;
            tags?: Array<string>;
        },
    ): CancelablePromise<{
        data: GeneralUpsertOutputSerial;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/memos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
}
