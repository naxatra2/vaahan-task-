import React, { useState } from 'react';

function EntityForm({ onSubmit }) {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: '', type: '' }]);
  };

  const handleAttributeNameChange = (index, value) => {
    const newAttributes = attributes.map((attr, i) => {
      if (i === index) return { ...attr, name: value };
      return attr;
    });
    setAttributes(newAttributes);
  };

  const handleAttributeTypeChange = (index, value) => {
    const newAttributes = attributes.map((attr, i) => {
      if (i === index) return { ...attr, type: value };
      return attr;
    });
    setAttributes(newAttributes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entityName, attributes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        placeholder="Entity Name"
        required
      />
      {attributes.map((attr, index) => (
        <div key={index}>
          <input
            type="text"
            value={attr.name}
            onChange={(e) => handleAttributeNameChange(index, e.target.value)}
            placeholder="Attribute Name"
            required
          />
          <select onChange={(e) => handleAttributeTypeChange(index, e.target.value)} required>
            <option value="">Select Type</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={handleAddAttribute}>Add Attribute</button>
      <button type="submit">Create Entity</button>
    </form>
  );
}

export default EntityForm;
