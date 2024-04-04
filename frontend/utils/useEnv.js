const useEnv = () => {
    const backend = import.meta.env.VITE_BACKEND
    return { backend }
}

export default useEnv