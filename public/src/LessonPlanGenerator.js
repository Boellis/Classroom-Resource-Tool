import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class LessonPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeLevel: '',
            subject: '',
            lessonTitle: '',
            objectives: '',
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
        const { gradeLevel, subject, lessonTitle, objectives } = this.state;
        const prompt = `Create a lesson plan with the following details:\nGrade Level: ${gradeLevel}\nSubject: ${subject}\nLesson Title: ${lessonTitle}\nObjectives: ${objectives}`;

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
        const { gradeLevel, subject, lessonTitle, objectives, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Lesson Plan Generation Form</h1>
                    <form id="lessonPlanForm" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="gradeLevel">Grade Level:</label>
                            <input type="text" className="form-control" id="gradeLevel" name="gradeLevel" required onChange={this.handleInputChange} value={gradeLevel} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" className="form-control" id="subject" name="subject" required onChange={this.handleInputChange} value={subject} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lessonTitle">Lesson Title:</label>
                            <input type="text" className="form-control" id="lessonTitle" name="lessonTitle" required onChange={this.handleInputChange} value={lessonTitle} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="objectives">Objectives:</label>
                            <textarea className="form-control" id="objectives" name="objectives" required onChange={this.handleInputChange} value={objectives}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Content:</h2>
                        <div id="lessonPlanFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LessonPlan;
