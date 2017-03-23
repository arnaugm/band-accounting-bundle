# Band accounting

Accounting system for bands

## Build backend

```
composer install
app/console doctrine:database:create
app/console doctrine:schema:create
app/console cache:clear
```

## Build frontend

```
cd client
npm install
grunt
cd ..
```

## Run app

```
app/console server:start
open http://localhost:8000
```

## Development

```
cd client
grunt watch
```

## Test

### Backend
```
bin/phpunit
```

### Frontend
```
npm test
```

