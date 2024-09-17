1. Instalación
1.1. Instala las dependencias
npm install
1.2. Inicia la aplicación
npm run dev


Endpoints
2. WEBSERIES
2.1. GET /api/v1/webseries

Obtiene todas las series. Devuelve un array de series con el nombre de la plataforma en lugar del ID.

2.2. POST /api/v1/webseries

Crea una nueva serie. Requiere un cuerpo con los siguientes campos:
{
  "title": "Título de la serie",
  "year": 2024,
  "creator": "Nombre del creador",
  "genre": "Género",
  "platform": "ID de la plataforma"
}

2.3. PUT /api/v1/webseries/:id

Actualiza una serie existente. Requiere el ID de la serie y un cuerpo con los campos a actualizar, puede ser uno o varios:

{
  "title": "Nuevo título",
  "year": 2024,
  "creator": "Nuevo creador",
  "genre": "Nuevo género",
  "platform": "Nuevo ID de la plataforma"
}
2.4. DELETE /api/v1/webseries/:id

Elimina una serie existente.


3. PLATAFORMAS
3.1 GET /api/v1/plataformas

Obtiene todas las plataformas con un array de series asociadas a cada plataforma.

3.2. POST /api/v1/plataformas

Crea una nueva plataforma. Requiere un cuerpo con los siguientes campos:

{
  "name": "Nombre de la plataforma",
  "price": "Precio",
  "url": "URL de la plataforma"
}

3.3. PUT /api/v1/plataformas/:id

Actualiza una plataforma existente. Permite añadir nuevas series o realizar cambios en la plataforma. Requiere el ID de la plataforma y un cuerpo con los campos a actualizar:
{
  "newSeries": ["ID de la serie 1", "ID de la serie 2"]
}

3.4. DELETE /api/v1/plataformas/:id

Elimina una plataforma existente.


4. ESTRUCTURA DE DATOS
4.1. Web Series
{
  "_id": "ID de la serie",
  "title": "Título de la serie",
  "year": 2024,
  "creator": "Nombre del creador",
  "genre": "Género",
  "platform": "ID de la plataforma",
  "createdAt": "Fecha de creación",
  "updatedAt": "Fecha de actualización"
}

4.2. Plataforma
{
  "_id": "ID de la plataforma",
  "name": "Nombre de la plataforma",
  "price": "Precio",
  "url": "URL de la plataforma",
  "series": [
    {
      "_id": "ID de la serie",
      "title": "Título de la serie",
      "year": 2024,
      "creator": "Nombre del creador",
      "platform": "ID de la plataforma",
      "genre": "Género",
      "createdAt": "Fecha de creación",
      "updatedAt": "Fecha de actualización"
    }
  ],
  "createdAt": "Fecha de creación",
  "updatedAt": "Fecha de actualización"
}