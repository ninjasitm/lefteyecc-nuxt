
// Vue composable with helper functions to parse properties on an object
export function useJsonHelper() {
    function parseProperties(obj: any, keys: string[]) {
        if (!obj) return null;
        if (!keys) return obj;
        if (keys.length === 0) return obj;
        keys.forEach(key => {
            if (obj[key]) {
                obj[key] = JSON.parse(obj[key]);
            }
        });
        return obj;
    }

    return {
        parseProperties,
    }
}
