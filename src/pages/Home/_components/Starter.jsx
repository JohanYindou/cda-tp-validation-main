import React, { useState } from 'react';
import Select from './Select';

const Starter = ({ onFormSubmit }) => {
    const [formData, setFormData] = useState({ name: '', subject: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(formData);
    };

    return (
        <form className="text-center" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">ReactGPT</h1>

            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="name"
                    placeholder="Comment tu t'appelles ?"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="floatingInput">Comment tu t'appelles ?</label>
            </div>

            <div className="form-floating mt-3">
                <Select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
                <label htmlFor="floatingSelect">Choisis un sujet</label>
            </div>

            <button
                className="btn btn-warning rounded-pill w-100 py-2 mt-3"
                type="submit"
            >
                Commencer la disscussion
            </button>
        </form>
    );
};

export default Starter;
