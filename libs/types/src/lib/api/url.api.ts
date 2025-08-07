import { Observable } from "rxjs";
import { Url } from "../url";

export interface ShortenInput {
    url: string;
}

export interface ShortenResponse extends Pick<Url,'id' | 'shortId' | 'originalUrl'> {
    id: string;
    shortId: string;
    originalUrl: string;
}

export interface GetUrlResponse extends Pick<Url, 'originalUrl'> {
    originalUrl: string;
}

export interface ListPaginatedUrlInput {
    page: number;
    pageSize: number;
}

export interface ListPaginatedUrlResponse {
    urls: Pick<Url, 'id' | 'shortId' | 'originalUrl'>[];
    total: number;
}

export interface UrlApi {
    shorten(input: ShortenInput): Observable<ShortenResponse>;
    list(input: ListPaginatedUrlInput): Observable<ListPaginatedUrlResponse>;
    getUrl(shortId: string): Observable<GetUrlResponse>;
}