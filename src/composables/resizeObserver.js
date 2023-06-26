export function useResizeObserver() {
    const resizeHandler = (resizeCallback) =>
        function handleIntersection(entries) {
            entries.forEach((entry) => {
                resizeCallback(entry);
            });
        };

    function observeResizeElement(element, resizeCallback) {
        const handleIntersection = resizeHandler(resizeCallback);
        const observer = new ResizeObserver(handleIntersection);
        observer.observe(element);
    }

    return {
        observeResizeElement,
    };
}
