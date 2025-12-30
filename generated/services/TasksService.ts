/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralUpsertOutputSerial } from '../models/GeneralUpsertOutputSerial';
import type { Task } from '../models/Task';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * List tasks
     * Retrieve a list of tasks with optional filtering and sorting.
     * @param tag
     * @param startDate
     * @param endDate
     * @returns any A list of tasks
     * @throws ApiError
     */
    public static getTasks(
        tag?: Array<string>,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data: Array<Task>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks',
            query: {
                'tag': tag,
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                404: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Create task
     * Create a new task.
     * @param requestBody Task creation payload
     * @returns any Task created successfully
     * @throws ApiError
     */
    public static createTask(
        requestBody: {
            title: string;
            description: string;
            due_date: string;
            tags?: Array<string>;
        },
    ): CancelablePromise<{
        data: GeneralUpsertOutputSerial;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error response`,
                500: `Error response`,
            },
        });
    }
    /**
     * Start a task
     * Mark a task as started.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static startTask(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tasks/{id}/start',
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
     * Complete a task
     * Mark a task as completed.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static completeTask(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tasks/{id}/complete',
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
