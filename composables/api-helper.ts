import { useFetch } from "@vueuse/core";

export function useApiHelper() {
    const config = useRuntimeConfig();

    async function getData(endpoint: string, params: any = {}): Promise<any> {
        const searchParams = (new URLSearchParams(params)).toString();
        const url = new URL(`${config.public.apiBase}${endpoint.replace(/^\//gm, '')}${searchParams.length ? `?${searchParams}` : ''}`);
        // console.log("API URL: ", url.toString());
        const { error, data } = await useFetch(url.toString()).get().json();
        if (error.value) {
            console.error("API Error: ", error);
            throw error;
        }
        console.log("API Data: ", data);
        return data.value;
    }

    async function getOne(endpoint: string, params: any = {}): Promise<any> {
        const result: any = await getData(`${endpoint}`, params);
        return result.data;
    }
    return {
        getData,
        getOne
    }
}
