import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let query = {};
    for (const [key, value] of searchParams) {
        query[key] = value;
    }
    return query;
}
export default useQueryParams;