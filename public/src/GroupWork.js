import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class GroupWork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeLevel: '',
            groupTopic: '',
            groupSize: '',
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
        const { gradeLevel, groupTopic, groupSize } = this.state;
        const prompt = `Create a group work plan for the following details:\nGrade Level: ${gradeLevel}\nGroup Topic: ${groupTopic}\nGroup Size: ${groupSize}`;

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
        const { gradeLevel, groupTopic, groupSize, generatedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Group Work Planning Form</h1>
                    <form id="groupWorkForm" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="gradeLevel">Grade Level:</label>
                            <select className="form-control" id="gradeLevel" name="gradeLevel" onChange={this.handleInputChange} value={gradeLevel}>
                                {/* Options for grade levels */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="groupTopic">Group Topic:</label>
                            <input type="text" className="form-control" id="groupTopic" name="groupTopic" required onChange={this.handleInputChange} value={groupTopic} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groupSize">Group Size:</label>
                            <input type="number" className="form-control" id="groupSize" name="groupSize" required onChange={this.handleInputChange} value={groupSize} />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Generating...' : 'Generate Plan'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Generated Group Work Plan:</h2>
                        <div id="groupWorkFormOutput" className="content-output">
                            {generatedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupWork;
