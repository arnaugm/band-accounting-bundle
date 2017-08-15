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

* Install the bundle in a dummy Symfony 2.7 application
* Change the band-accounting dependency for a symlink to this project's root folder
```bash
mv <dummy_application_folder>/vendor/arnaugm/band-accounting-bundle <dummy_application_folder>/vendor/arnaugm/band-accounting-bundle-bkp
ln -s <root_folder> <dummy_application_folder>/vendor/arnaugm/band-accounting-bundle
```
* Start PHP server from the dummy application
```bash
cd <dummy_application_folder>
app/console server:start
```
* Build client
```bash
cd <root_folder>/client
npm install
grunt
```
* Enable client watcher
```bash
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

