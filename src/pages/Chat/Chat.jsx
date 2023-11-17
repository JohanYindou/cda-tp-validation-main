import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import OpenAI from 'openai'
import Toast from '../Home/_components/ToastMessage'
import config from '../../../config'

// Composant Chat pour interagir avec l'API OpenAI
function Chat() {
    // Initialisation des états
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(location.state?.formData) // Stocke les données du formulaire
    const [userQuestion, setUserQuestion] = useState('') // Stocke la question de l'utilisateur
    const [conversation, setConversation] = useState([]); // Stocke la conversation entre l'utilisateur et l'IA
    
    const prePrompt = `Agis comme un chat bot qui répond aux question de ${formData.name}.
    Répond en commencent par son prénom et une salutation originale. La thématique est ${formData.subject}` ;

    // Effet pour la vérification des données du formulaire
    useEffect(() => {
        // Vérifie si les données du formulaire (nom et sujet) sont présentes
        if (formData?.name && formData?.subject) {
            // Déclenche des confettis si les données du formulaire sont présentes
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })
        } else {
            // Redirige vers la page d'accueil si les données du formulaire sont manquantes
            navigate('/')
        }
    }, [formData, navigate])

    // Initialisation de l'API OpenAI
    const openai = new OpenAI({
        apiKey: config.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    })

    // Gestion de la soumission des questions
    const handleQuestionSubmission = async event => {
        event.preventDefault()
        try {
            // Envoie la question à l'API OpenAI pour obtenir une réponse
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-0613',
                messages: [
                    {
                        role: 'user',
                        content: `${prePrompt + userQuestion}`,
                    }
                ],
            })

            // Ajoute la question de l'utilisateur et la réponse de l'IA à la conversation
            setConversation([
                ...conversation,
                { role: 'user', content: userQuestion },
                { role: 'bot', content: response.choices[0].message.content },
            ])
            setUserQuestion('')
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Vérifie si les données du formulaire sont présentes, sinon rend null
    if (!formData) {
        return null
    }

    // Rendu de l'interface utilisateur
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
