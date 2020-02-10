import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function CenterPane() {
    return (
      <div class="center-pane">
          <Alert variant="success">
            Успешно.
          </Alert>
          <Button>Привет, мир</Button>
      </div>
    );
}

export default CenterPane;