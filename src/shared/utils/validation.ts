export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    if (!phone.trim()) return true;
    const cleanPhone = phone.replace(/[\s\-().]/g, '');
    const phoneRegex = /^\+?\d{9,15}$/;
    return phoneRegex.test(cleanPhone);
};