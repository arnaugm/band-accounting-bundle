# Band accounting bundle

Accounting system for music bands.
Symfony2 bundle.

## Installation

### Step 1: Download the Bundle
```bash
$ composer require arnaugm/band-accounting-bundle
```

### Step 2: Enable needed bundles
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
            new ArnauGM\BandAccountingBundle\ArnauGMBandAccountingBundle(),
            new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
        );
    }

    // ...
}
```

### Step 3: Configure the bundles
```yaml
# app/config/config.yml
stof_doctrine_extensions:
    default_locale: es_ES
    orm:
        default:
            timestampable: true
    
# ...
```

### Step 4: Load the Routes of the Bundle
```yaml
# app/config/routing.yml
band_accounting:
    resource: '@ArnauGMBandAccountingBundle/Resources/config/routing.yml'
    prefix:   /admin/accounting
    
# ...
```

### Step 5: Prepare the Web Assets of the Bundle
```bash
app/console assets:install --symlink
```

## Development

### Build frontend

```
cd client
npm install
grunt
cd ..
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

