# Band accounting bundle

Accounting system for music bands.
Symfony2 bundle.

## Installation

### Step 1: Download the Bundle
```bash
$ composer require arnaugm/band-accounting-bundle
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
            new ArnauGM\BandAccountingBundle\ArnauGMBandAccountingBundle(),
        );
    }

    // ...
}
```

### Step 3: Load the Routes of the Bundle
```yaml
# app/config/routing.yml
band_accounting:
    resource: '@ArnauGMBandAccountingBundle/Resources/config/routing.yml'
    prefix:   /admin/accounting
    
# ...
```

### Step 4: Prepare the Web Assets of the Bundle
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

