import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';


const TopicSelect = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: '',
        expertise: '',
        numberOfQuestions: '5',
        styleOfQuestions: 'normal'
    });

    useEffect(() => {
        // Initialize Materialize select elements
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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
                                <option value="5" disabled></option>
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
                                <option value="normal" disabled></option>
                                <option value="normal">normal</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="open-ended">Open Ended</option>
                            </select>
                            <label>Style of questions</label>
                        </div>

                        <button
                            className="btn waves-effect waves-light teal"
                            type="submit"
                            onClick={() => navigate("/quiz-page")}
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TopicSelect;