# Band accounting bundle

Accounting system for music bands.
Symfony2 bundle.

## Installation

### Step 1: Download the Bundle
```bash
$ composer require arnaugm/band-accounting
```

### Step 2: Enable the Bundle
```php
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle(),
        );
    }

    // ...
}
```

### Step 3: Load the Routes of the Bundle
```yaml
# app/config/routing.yml
band_accounting:
    resource: '@RootDiamoonsBandAccountingBundle/Resources/config/routing.yml'
    prefix:   /admin/accounting
    
# ...
```

### Step 4: Prepare the Web Assets of the Bundle
```bash
app/console assets:install --symlink
```

## Development

### Build backend

```
composer install
app/console doctrine:database:create
app/console doctrine:schema:create
app/console cache:clear
```

### Build frontend

```
cd client
npm install
grunt
cd ..
```

### Run app

```
app/console server:start
open http://localhost:8000
```

### Enable client watcher

```
cd client
grunt watch
```

### Test

#### Backend
```
bin/phpunit
```

#### Frontend
```
npm test
```

