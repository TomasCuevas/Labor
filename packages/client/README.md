# Next.js OpenJira App

Para correr localmente, se necesita la base de datos.

```
  docker-compose up -d
```

- El -d, significa **detached**

MongoDB local URL:

```
  mongodb://localhost:27017/entries
```

## Configurar las variables de entorno

## Llenar la base de datos con la informacion de prueba

Llamada:

```
  http://localhost:3000/api/seed
```
