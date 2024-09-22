// Initialize the Fabric.js canvas
const canvas = new fabric.Canvas('canvas');

// Add Text Button
document.getElementById('add-text').addEventListener('click', function() {
  const text = new fabric.Textbox('Edit me!', {
    left: 100,
    top: 100,
    fontSize: 24,
    fill: '#000',
    fontFamily: 'Arial',
    textAlign: 'left'
  });
  canvas.add(text);
  canvas.setActiveObject(text);
});

// Add Rectangle Button
document.getElementById('add-rect').addEventListener('click', function() {
  const rect = new fabric.Rect({
    left: 150,
    top: 150,
    fill: 'blue',
    width: 100,
    height: 100
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
});

// Add Circle Button
document.getElementById('add-circle').addEventListener('click', function() {
  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: 'green'
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
});

// Image Upload
document.getElementById('upload-image').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    fabric.Image.fromURL(event.target.result, function(img) {
      img.scale(0.5);
      canvas.add(img);
      canvas.setActiveObject(img);
    });
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Update object color
document.getElementById('object-color').addEventListener('input', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set('fill', this.value);
    canvas.renderAll();
  }
});

// Update font family (for text objects)
document.getElementById('font-select').addEventListener('change', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('fontFamily', this.value);
    canvas.renderAll();
  }
});

// Update font size (for text objects)
document.getElementById('font-size').addEventListener('input', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('fontSize', parseInt(this.value, 10));
    canvas.renderAll();
  }
});

// Text alignment (left, center, right)
document.getElementById('align-left').addEventListener('click', function() {
  updateTextAlign('left');
});
document.getElementById('align-center').addEventListener('click', function() {
  updateTextAlign('center');
});
document.getElementById('align-right').addEventListener('click', function() {
  updateTextAlign('right');
});

function updateTextAlign(align) {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('textAlign', align);
    canvas.renderAll();
  }
}

// Z-Index (Bring Forward and Send Backward)
document.getElementById('bring-forward').addEventListener('click', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringForward(activeObject);
    canvas.renderAll();
  }
});

document.getElementById('send-backward').addEventListener('click', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendBackwards(activeObject);
    canvas.renderAll();
  }
});

// Update opacity
document.getElementById('object-opacity').addEventListener('input', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set('opacity', parseFloat(this.value));
    canvas.renderAll();
  }
});

// Update rotation
document.getElementById('object-rotation').addEventListener('input', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set('angle', parseInt(this.value, 10));
    canvas.renderAll();
  }
});

// Delete selected object
document.getElementById('delete-object').addEventListener('click', function() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
  }
});



// Export Image Functionality
document.getElementById('export-image').addEventListener('click', function() {
    const format = document.getElementById('image-format').value; // 'png' or 'jpeg'
    const scale = parseInt(document.getElementById('image-scale').value); // scale factor for high quality
  
    // Generate a data URL for the canvas
    const dataURL = canvas.toDataURL({
      format: format,
      multiplier: scale // Multiplier for scaling the image (for high quality)
    });
  
    // Create a download link
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `canvas-design.${format}`;
    link.click();
  });
  
  // Save Design as JSON
  document.getElementById('save-json').addEventListener('click', function() {
    const json = JSON.stringify(canvas.toJSON());
    const blob = new Blob([json], { type: 'application/json' });
  
    // Create a download link for the JSON file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'canvas-design.json';
    link.click();
  });
  
  // Load Design from JSON
  document.getElementById('load-design').addEventListener('click', function() {
    const fileInput = document.getElementById('load-json');
    console.log(fileInput.files)
    if (fileInput.files.length === 0) {
      alert('Please select a JSON file to load.');
      return;
    }
  
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const json = event.target.result;
      canvas.loadFromJSON(json, function() {
        canvas.renderAll();
      });
    };
    
    reader.readAsText(file);
  });