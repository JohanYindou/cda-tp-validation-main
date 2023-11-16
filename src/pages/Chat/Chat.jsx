import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import OpenAI from 'openai'
import config from '../../../config'

function Chat() {
    const location = useLocation()
    const navigate = useNavigate()
    const formData = location.state?.formData
    const [userQuestion, setUserQuestion] = useState('')
    const [conversation, setConversation] = useState([]) // Stocke les conversations

    useEffect(() => {
        if (formData.name && formData.subject) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        } else {
            navigate('/')
        }
    }, [formData, navigate])

    // Initialise l'API OpenAI
    const openai = new OpenAI({
        apiKey: config.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    })

    // Fonction pour gérer l'envoi de la question à l'API et recevoir la réponse
    const handleQuestionSubmission = async event => {
        event.preventDefault()
        try {
            // Utilise l'API OpenAI pour obtenir la réponse
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Je m'appelle ${formData.name}.`,
                    },
                    { role: 'user', content: userQuestion },
                ],
            })

            // Ajoute la question de l'utilisateur et la réponse de l'IA à la conversation
            setConversation([
                ...conversation,
                { role: 'user', content: userQuestion },
                { role: 'bot', content: response.choices[0].message.content },
            ])
            setUserQuestion('') // Efface la question de l'input
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!formData) {
        return null
    }

    return (
        <main className="text-center container mt-5">
            <h1 className="form-signin col-md-6 col-sm-10 m-auto mb-3">
                Bienvenue, {formData.name}
            </h1>
            <h3>Pose-moi tes questions sur {formData.subject}</h3>
            <form onSubmit={handleQuestionSubmission}>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Pose ta question ici"
                        value={userQuestion}
                        onChange={e => setUserQuestion(e.target.value)}
                    ></textarea>
                </div>
                <button className="btn btn-warning rounded-pill" type="submit">
                    Envoyer
                </button>
            </form>

            <div className="mt-3 p-2 border border-2">
                {conversation.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.role === 'user' ? 'text-start' : 'text-end'
                        }
                    >
                        {message.role === 'user' ? (
                            <p className="fw-bold">Vous : {message.content}</p>
                        ) : (
                            <p className="fw-bold">
                                Réponse de l'IA : {message.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Chat
