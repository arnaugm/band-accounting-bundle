<?php

namespace ArnauGM\BandAccountingBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('concept')
            ->add('amount')
            ->add('dateValue', 'date', array(
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy',
                'attr' => array('class' => 'date-value')
            ));

        $builder
            ->add('submit', 'submit');
    }

    public function getName()
    {
        return 'activity';
    }
}