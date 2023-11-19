import React from 'react';
import './style.css'; // Assuming style.css is in the same directory
import { Link } from 'react-router-dom';
import fetchChatGPTResponse from './chatGPTService'; // Import the centralized API call function

class UnpackStandards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standardText: '',
            unpackedContent: '',
            isLoading: false
        };
    }

    handleStandardTextChange = (event) => {
        this.setState({ standardText: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { standardText } = this.state;
        const prompt = `Unpack the following educational standard:\n\n${standardText}`;

        try {
            const response = await fetchChatGPTResponse(prompt);
            this.setState({ unpackedContent: response });
        } catch (error) {
            console.error('Error:', error);
            // Optionally, handle the error in the UI as well
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { standardText, unpackedContent, isLoading } = this.state;

        return (
            <div className="container my-4">
                <Link to="/" className="home-button">Home</Link>
                <div className="form-card">
                    <h1>Unpack Standards Form</h1>
                    <form id="unpackStandardsForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="standardText">Standard Text:</label>
                            <textarea className="form-control" id="standardText" name="standardText" required value={standardText} onChange={this.handleStandardTextChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? 'Unpacking...' : 'Unpack Standards'}</button>
                    </form>
                    <div className="output-container mt-4">
                        <h2>Unpacked Standards:</h2>
                        <div id="unpackStandardsFormOutput" className="content-output">
                            {unpackedContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnpackStandards;
