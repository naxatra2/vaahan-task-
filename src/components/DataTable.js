import React, { useState } from 'react';

function DataTable({ entityName, attributes, records, setEntities }) {
  const [formValues, setFormValues] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Initialize form values based on the current attributes
  const initializeFormValues = () => {
    const initialValues = {};
    attributes.forEach(attr => {
      initialValues[attr.name] = '';
    });
    setFormValues(initialValues);
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Add or update a record based on form values
  const handleSaveRecord = () => {
    const newRecords = [...records];
    if (editIndex !== null) {
      // Update existing record
      newRecords[editIndex] = { ...formValues };
      setEditIndex(null);
    } else {
      // Add new record
      newRecords.push({ ...formValues });
    }
    setEntities((prevEntities) => ({
      ...prevEntities,
      [entityName]: { attributes, records: newRecords }
    }));
    initializeFormValues();
  };

  // Edit a record
  const handleEditRecord = (index) => {
    setEditIndex(index);
    setFormValues(records[index]);
  };

  // Delete a record
  const handleDeleteRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setEntities((prevEntities) => ({
      ...prevEntities,
      [entityName]: { attributes, records: newRecords }
    }));
  };

  return (
    <div>
      <h2>{entityName} Records</h2>
      <table>
        <thead>
          <tr>
            {attributes.map((attr, index) => (
              <th key={index}>{attr.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              {attributes.map((attr, attrIndex) => (
                <td key={attrIndex}>{record[attr.name]}</td>
              ))}
              <td>
                <button onClick={() => handleEditRecord(index)}>Edit</button>
                <button onClick={() => handleDeleteRecord(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editIndex !== null ? 'Edit Record' : 'Add Record'}</h3>
      {attributes.map((attr, index) => (
        <input
          key={index}
          type={attr.type === 'number' ? 'number' : attr.type}
          name={attr.name}
          value={formValues[attr.name] || ''}
          placeholder={attr.name}
          onChange={handleInputChange}
          required
        />
      ))}
      <button onClick={handleSaveRecord}>
        {editIndex !== null ? 'Update Record' : 'Add Record'}
      </button>
    </div>
  );
}

export default DataTable;
