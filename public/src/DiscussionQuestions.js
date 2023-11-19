import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class DiscussionQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            generatedContent: '',
            isLoading: false
        };
    }

    handleTopicChange = (event) => {
        this.setState({ topic: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { topic } = this.state;
        const prompt = `Create a discussion question based on the topic: ${topic}`;

        try {
            const response = await fetchChatGPTResponse(prompt);
            this.setState({ generatedContent: response });
        } catch (error) {
            console.error('Error:', error);
            // Optionally, handle the error in the UI as well
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { topic, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Discussion Question Generation Form</h1>
                    <form id="discussionQuestionForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="topic">Topic:</label>
                            <input type="text" className="form-control" id="topic" name="topic" required value={topic} onChange={this.handleTopicChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Content:</h2>
                        <div id="discussionQuestionFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiscussionQuestion;
