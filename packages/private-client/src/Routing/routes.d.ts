import { LoaderFunction } from 'react-router-dom';
declare const routes: ({
    path: string;
    element: import("react/jsx-runtime").JSX.Element;
    loader: LoaderFunction;
} | {
    path: string;
    element: import("react/jsx-runtime").JSX.Element;
    loader?: undefined;
})[];
export default routes;
