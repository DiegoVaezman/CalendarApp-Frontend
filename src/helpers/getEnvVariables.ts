

export const getEnvVariables = () => {
    const varibles = import.meta.env;
    return {
        ...varibles
    }
}