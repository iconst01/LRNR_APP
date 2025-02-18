import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the API package

const TopicSelect = () => {
    const [formData, setFormData] = useState({
        topic: '',
        expertise: '',
        numberOfQuestions: '5',
        styleOfQuestions: 'normal'
    });
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation to QuestionPage

    useEffect(() => {
    
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        setLoading(true); // Start loading
        try {
            // Initialize the Google Generative AI
            // const genAI = new GoogleGenerativeAI("AIzaSyBjiDeD5CMe5A3jsRYhTlFup_0TqVBpk4o");
            // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Generate ${formData.numberOfQuestions} ${formData.styleOfQuestions} questions for a ${formData.expertise} level in the topic of ${formData.topic}.`;

            // Call the API to generate content
            const result = await model.generateContent(prompt);
            const questions = result.response.text().split('\n').filter(q => q.trim() !== ''); 

            // Navigate to the QuestionPage with the questions as state
            navigate('/questions', { state: { questions, numberOfQuestions: formData.numberOfQuestions } });
        } catch (error) {
            console.error("Error generating content:", error);
            setResponseText("Sorry, something went wrong. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <select
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="history">History</option>
                            </select>
                            <label>Topic</label>
                        </div>

                        <div className="input-field">
                            <select
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <label>Expertise</label>
                        </div>

                        <div className="input-field">
                            <select
                                name="numberOfQuestions"
                                value={formData.numberOfQuestions}
                                onChange={handleChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                            <label>Number of questions</label>
                        </div>

                        <div className="input-field">
                            <select
                                name="styleOfQuestions"
                                value={formData.styleOfQuestions}
                                onChange={handleChange}
                            >
                                <option value="normal">Normal</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="open-ended">Open Ended</option>
                            </select>
                            <label>Style of questions</label>
                        </div>

                        <button
                            className="btn waves-effect waves-light teal"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'SUBMIT'}
                        </button>
                    </form>

                    {responseText && <div className="response-text"><p>{responseText}</p></div>}
                </div>
            </div>
        </div>
    );
};

export default TopicSelect;

