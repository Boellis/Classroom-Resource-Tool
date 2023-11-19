import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class UnitPlanGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeLevel: '',
            subject: '',
            unitTitle: '',
            objectives: '',
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

    handleUnitTitleChange = (event) => {
        this.setState({ unitTitle: event.target.value });
    }

    handleObjectivesChange = (event) => {
        this.setState({ objectives: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { gradeLevel, subject, unitTitle, objectives } = this.state;
        const prompt = `Create a comprehensive unit plan for the following details:\nGrade Level: ${gradeLevel}\nSubject: ${subject}\nUnit Title: ${unitTitle}\nObjectives: ${objectives}`;

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
        const { gradeLevel, subject, unitTitle, objectives, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Unit Plan Generation Form</h1>
                    <form id="unitPlanForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gradeLevel">Grade Level:</label>
                            <input type="text" className="form-control" id="gradeLevel" name="gradeLevel" required value={gradeLevel} onChange={this.handleGradeLevelChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" className="form-control" id="subject" name="subject" required value={subject} onChange={this.handleSubjectChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="unitTitle">Unit Title:</label>
                            <input type="text" className="form-control" id="unitTitle" name="unitTitle" required value={unitTitle} onChange={this.handleUnitTitleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="objectives">Objectives:</label>
                            <textarea className="form-control" id="objectives" name="objectives" required value={objectives} onChange={this.handleObjectivesChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Content:</h2>
                        <div id="unitPlanFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnitPlanGenerator;
