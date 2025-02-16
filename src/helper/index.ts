// Mock API call to get story data
export const getStoryData = async () => {
    try {
        const response = await fetch('/storyData.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch story data:", error);
        throw error;
    }
};
