// chatGPTService.js

const fetchChatGPTResponse = async (prompt) => {
    const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const apiKey = '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'; // Use environment variable for API key

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt, max_tokens: 2048 })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].text;
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        throw error;
    }
};

export default fetchChatGPTResponse;
