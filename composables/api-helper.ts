import { useFetch } from "@vueuse/core";

export function useApiHelper() {
    const config = useRuntimeConfig();
    console.debug("Config", config);

    async function getAll(endpoint: string, params: any = {}): Promise<any> {
        const searchParams = (new URLSearchParams(params)).toString();
        const url = new URL(`${config.public.apiBase}${endpoint.replace(/^\//gm, '')}${searchParams.length ? `?${searchParams}` : ''}`);
        // console.log("API URL: ", url.toString());
        const { error, data, statusCode } = await useFetch(url.toString()).get().json();
        if (error.value) {
            console.error("API Error: ", error);
            const errorDetails = {
                statusMessage: error.value,
                message: 'Something went wrong. If this keeps happening send me an email: <a href=mailto:lefteye@lefteye.cc?subject=Something went wrong on your website>lefteye@lefteye.cc</a>',
                statusCode: statusCode.value || 404,
            };
            showError(errorDetails);
            throw createError(errorDetails);
        }
        console.debug("API Data: ", data);
        return data.value;
    }

    async function getOne(endpoint: string, params: any = {}): Promise<any> {
        const result: any = await getAll(`${endpoint}`, params);
        return result?.data;
    }
    return {
        getAll,
        getOne
    }
}
