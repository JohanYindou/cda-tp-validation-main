import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo'
import Starter from './_components/Starter'
import ToastMessage from './_components/ToastMessage'

function App() {
    const [formData, setFormData] = useState({})
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate()

    const handleFormSubmit = data => {
        setFormData(data)
        setShowToast(true)

        console.log('Données reçues du formulaire:', data)
        setTimeout(() => {
            setShowToast(false)
        }, 6000)
        navigate('/chat', { state: { formData: data } })
    }

    return (
        <main className="form-signin col-md-4 col-sm-10 m-auto">
            <Logo />
            <Starter onFormSubmit={handleFormSubmit} />
            <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)}
                message={`Hello ${formData.name} parlons de ${formData.subject}`}
            />
        </main>
    )
}

export default App
