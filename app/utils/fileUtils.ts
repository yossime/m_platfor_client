

export const sanitizeFileName = (fileName: string): string => {

    let sanitized = fileName.replace(/\s+/g, '_');
    
    sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');

    if (sanitized.length > 255) {
        sanitized = sanitized.slice(0, 255);
    }

    return sanitized;
};
