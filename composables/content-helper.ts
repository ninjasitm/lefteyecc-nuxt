
// Vue composable with helper functions for content

export function useContentHelper() {
    const config = useRuntimeConfig();
    function getMediaUrl(url: string) {
        const validator = new RegExp(/http/);
        if (validator.test(url)) {
            return url;
        }
        return config.public.cdnBase + url.replace(/^\//gm, '');
    }

    return {
        getMediaUrl,
    }
}
