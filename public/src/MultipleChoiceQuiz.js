import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class MultipleChoiceQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            numberOfQuestions: 1,
            generatedContent: '',
            isLoading: false
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { topic, numberOfQuestions } = this.state;
        const prompt = `Create a multiple choice quiz on the topic of '${topic}' with ${numberOfQuestions} questions`;

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
        const { topic, numberOfQuestions, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Multiple Choice Quiz Generation Form</h1>
                    <form id="multipleChoiceQuizForm" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="topic">Topic:</label>
                            <input type="text" className="form-control" id="topic" name="topic" required onChange={this.handleInputChange} value={topic} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfQuestions">Number of Questions:</label>
                            <input type="number" className="form-control" id="numberOfQuestions" name="numberOfQuestions" min="1" required onChange={this.handleInputChange} value={numberOfQuestions} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Content:</h2>
                        <div id="multipleChoiceQuizFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MultipleChoiceQuiz;
