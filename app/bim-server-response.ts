export class BimServerResponse<T> {
    isError: boolean;

    error: any;
    result: T;
}