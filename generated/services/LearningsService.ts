/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralUpsertOutputSerial } from '../models/GeneralUpsertOutputSerial';
import type { LearningArea } from '../models/LearningArea';
import type { LearningItem } from '../models/LearningItem';
import type { Pagination } from '../models/Pagination';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LearningsService {
    /**
     * List learning areas
     * Retrieve a list of learning areas.
     * @returns any A list of learning areas
     * @throws ApiError
     */
    public static getLearningAreas(): CancelablePromise<{
        data: Array<LearningArea>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/learnings/area',
            errors: {
                404: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Create new learning area
     * Create a new learning area.
     * @param requestBody Learning area creation payload
     * @returns any Learning area created successfully
     * @throws ApiError
     */
    public static createLearningArea(
        requestBody: {
            name: string;
            description: string;
            color_hex: string;
            icon_emoji: string;
        },
    ): CancelablePromise<{
        data: GeneralUpsertOutputSerial;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/learnings/area',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Create new learning item
     * Create a new learning item.
     * @param requestBody Learning item creation payload
     * @returns any Learning item created successfully
     * @throws ApiError
     */
    public static createLearningItem(
        requestBody: {
            area_id: number;
            title: string;
            notes: string;
            subtitle: string;
            started_date: string;
            expected_completion: string;
        },
    ): CancelablePromise<{
        data: GeneralUpsertOutputSerial;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/learnings/items',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * List learning items by area
     * Retrieve a list of learning items for a specific learning area.
     * @param areaId
     * @param page
     * @param limit
     * @returns any A list of learning items by area
     * @throws ApiError
     */
    public static getLearningItemsByArea(
        areaId: number,
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<LearningItem>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/learnings/area/{areaId}/items',
            path: {
                'areaId': areaId,
            },
            query: {
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
     * Get learning area details
     * Retrieve details of a specific learning area.
     * @param areaId
     * @returns any Learning area details
     * @throws ApiError
     */
    public static getLearningAreaById(
        areaId: number,
    ): CancelablePromise<{
        data: LearningArea;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/learnings/area/{areaId}',
            path: {
                'areaId': areaId,
            },
            errors: {
                404: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Start a learning item
     * Mark a learning item as started.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static startLearningItem(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/learnings/item/{id}/start',
            path: {
                'id': id,
            },
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Complete a learning item
     * Mark a learning item as completed.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static completeLearningItem(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/learnings/item/{id}/complete',
            path: {
                'id': id,
            },
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
}
