import React, { useState } from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class BellRingers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeLevel: '',
            subject: '',
            generatedContent: '',
            isLoading: false
        };
    }

    handleGradeLevelChange = (event) => {
        this.setState({ gradeLevel: event.target.value });
    }

    handleSubjectChange = (event) => {
        this.setState({ subject: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { gradeLevel, subject } = this.state;
        const prompt = `Create a bell ringer activity for Grade Level: ${gradeLevel}, Subject: ${subject}`;

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
        const { gradeLevel, subject, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Bell Ringer Generation Form</h1>
                    <form id="bellRingerForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gradeLevel">Grade Level:</label>
                            <select className="form-control" id="gradeLevel" name="gradeLevel" value={gradeLevel} onChange={this.handleGradeLevelChange}>
                                {/* Options go here */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" className="form-control" id="subject" name="subject" required value={subject} onChange={this.handleSubjectChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Content:</h2>
                        <div id="bellRingerFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BellRingers;
