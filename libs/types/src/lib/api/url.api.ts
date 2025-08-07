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

export interface ListAllResponse {
    urls: Pick<Url, 'id' | 'shortId' | 'originalUrl'>[];
}

export interface GetUrlResponse extends Pick<Url, 'originalUrl'> {
    originalUrl: string;
}

export interface UrlApi {
    shorten(input: ShortenInput): Observable<ShortenResponse>;
    listAll(): Observable<ListAllResponse>;
    getUrl(shortId: string): Observable<GetUrlResponse>;
}