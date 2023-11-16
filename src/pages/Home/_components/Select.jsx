import React from 'react'

const Select = ({ value, onChange }) => {
    const options = [
        { id: 0, name: 'Sélection', muted: true },
        { id: 1, name: 'Internet et le web' },
        { id: 2, name: 'JavaScript ES6+' },
        { id: 3, name: 'ReactJS' },
        { id: 4, name: 'NodeJS' },
        { id: 5, name: 'PHP' },
        { id: 6, name: 'Symfony' },
    ]

    return (
        <select
            className="form-select"
            id="floatingSelect"
            value={value}
            onChange={onChange}
        >
            {options.map(option => (
                <option key={option.id} value={option.name} required>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default Select
