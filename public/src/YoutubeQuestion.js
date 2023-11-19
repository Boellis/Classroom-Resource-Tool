import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class YouTubeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            outputHistory: [],
            isLoading: false
        };
    }

    componentDidMount() {
        // Retrieve output history from localStorage
        const history = JSON.parse(localStorage.getItem('outputHistory')) || [];
        this.setState({ outputHistory: history });
    }

    handleQuestionChange = (event) => {
        this.setState({ question: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { question } = this.state;
        const prompt = `Generate a YouTube discussion question based on: ${question}`;

        try {
            const response = await fetchChatGPTResponse(prompt);
            this.updateOutputHistory(response);
        } catch (error) {
            console.error('Error:', error);
            // Optionally, handle the error in the UI as well
        } finally {
            this.setState({ isLoading: false });
        }
    };

    updateOutputHistory = (newEntry) => {
        this.setState(prevState => {
            const updatedHistory = [newEntry, ...prevState.outputHistory];
            localStorage.setItem('outputHistory', JSON.stringify(updatedHistory));
            return { outputHistory: updatedHistory };
        });
    };

    render() {
        const { question, outputHistory, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>YouTube Question Generator</h1>
                    <form id="youtubeQuestionForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="question">Question:</label>
                            <input type="text" className="form-control" id="question" name="question" required value={question} onChange={this.handleQuestionChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                </div>
                <div id="historyContainer" className="history-container">
                    {outputHistory.map((entry, index) => (
                        <div key={index} className="history-entry">
                            {entry}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default YouTubeQuestion;
