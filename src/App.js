import React, { useState } from 'react';
import EntityForm from './components/EntityForm';
import DataTable from './components/DataTable';

function App() {
  const [entities, setEntities] = useState({});
  const [currentEntity, setCurrentEntity] = useState(null);

  const handleEntitySubmit = (entityName, attributes) => {
    const newEntities = {
      ...entities,
      [entityName]: { attributes, records: [] }
    };
    setEntities(newEntities);
    setCurrentEntity(entityName);
  };

  return (
    <div>
      <h1>Basic Headless CMS</h1>
      <EntityForm onSubmit={handleEntitySubmit} />
      {currentEntity && (
        <DataTable
          entityName={currentEntity}
          attributes={entities[currentEntity].attributes}
          records={entities[currentEntity].records}
          setEntities={setEntities}
        />
      )}
    </div>
  );
}

export default App;
