<?php

namespace RootDiamoons\BandAccountingBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('concept')
            ->add('amount')
            ->add('dateValue');

        $builder
            ->add('submit', 'submit');
    }

    public function getName()
    {
        return 'activity';
    }
}