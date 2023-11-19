import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class TextLeveler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeLevel: '',
            textInput: '',
            leveledText: '',
            isLoading: false
        };
    }

    handleGradeLevelChange = (event) => {
        this.setState({ gradeLevel: event.target.value });
    };

    handleTextInputChange = (event) => {
        this.setState({ textInput: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { gradeLevel, textInput } = this.state;
        const prompt = `Level the following text to a ${gradeLevel} reading level:\n\n${textInput}`;

        try {
            const response = await fetchChatGPTResponse(prompt);
            this.setState({ leveledText: response });
        } catch (error) {
            console.error('Error:', error);
            // Optionally, handle the error in the UI as well
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { gradeLevel, textInput, leveledText, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Text Leveler Tool</h1>
                    <form id="textLevelerForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gradeLevel">Grade Level:</label>
                            <select className="form-control" id="gradeLevel" name="gradeLevel" value={gradeLevel} onChange={this.handleGradeLevelChange}>
                                <option value="Kindergarten">Kindergarten</option>
                                {/* Add other grade level options here */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="textInput">Text Input:</label>
                            <textarea className="form-control" id="textInput" name="textInput" required value={textInput} onChange={this.handleTextInputChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Leveling...' : 'Level Text'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Leveled Text:</h2>
                        <div id="textLevelerFormOutput" className="content-output">
                            {leveledText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextLeveler;
