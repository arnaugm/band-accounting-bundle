<?php

namespace Tests\RootDiamoons\BandAccountingBundle\Repository;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ActivityRepositoryTest extends KernelTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $em;

    /**
     * {@inheritDoc}
     */
    protected function setUp()
    {
        self::bootKernel();

        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    /**
     * {@inheritDoc}
     */
    protected function tearDown()
    {
        parent::tearDown();

        $this->em->close();
        $this->em = null; // avoid memory leaks
    }

    public function testSearchByCategoryName()
    {
        $products = $this->em
            ->getRepository('BandAccountingBundle:Activity')
            ->getActivities();

        $this->assertCount(1, $products);
    }
}