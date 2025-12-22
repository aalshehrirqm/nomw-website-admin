
export const transformUrl = (path: string): string => {
    if (!path) return path;

    if (path.startsWith('http')) {
        return path;
    }

    // Remove leading slash if present to avoid double slashes when joining
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    let baseUrl = 'http://localhost:3000';

    if (process.env.NODE_ENV === 'production') {
        baseUrl = process.env.API_URL || 'https://api.nomw.test.rqm.sa';
    }

    // Ensure baseUrl doesn't end with slash
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    return `${cleanBaseUrl}/${cleanPath}`;
};
