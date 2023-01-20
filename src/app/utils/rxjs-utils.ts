import {Observable, skipWhile} from "rxjs";

export const skipEmpty = () => <T>(source: Observable <T>): Observable<T> => source.pipe(skipWhile(value => (value === null)|| (value === undefined)));
