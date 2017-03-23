<?php

namespace Tests\RootDiamoons\BandAccountingBundle\Repository;

use Mockery as m;
use RootDiamoons\BandAccountingBundle\Repository\ActivityRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ActivityRepositoryTest extends KernelTestCase
{
    /**
     * {@inheritDoc}
     */
    protected function tearDown()
    {
        m::close();
    }

    public function testGetActivities()
    {
        $qb = m::mock('Doctrine\ORM\QueryBuilder')
            ->shouldReceive('select')
            ->andReturn(m::self())
            ->shouldReceive('from')
            ->andReturn(m::self())
            ->shouldReceive('orderBy')
            ->andReturn(m::self())
            ->shouldReceive('getQuery')
            ->andReturn(m::self())
            ->shouldReceive('getResult')
            ->andReturn(m::self())
            ->mock();

        $emMock = m::mock('Doctrine\ORM\EntityManager')
            ->shouldReceive('createQueryBuilder')
            ->andReturn($qb)
            ->mock();


        $classMetaMock = m::mock('Doctrine\ORM\Mapping\ClassMetadata');
        $repo = new ActivityRepository($emMock, $classMetaMock);

        $repo->getActivities();
    }

    public function testGetLastTermActivities()
    {
        $qb = m::mock('Doctrine\ORM\QueryBuilder')
            ->shouldReceive('select')
            ->andReturn(m::self())
            ->shouldReceive('from')
            ->andReturn(m::self())
            ->shouldReceive('where')->with('a.dateValue > 2')
            ->once()
            ->andReturn(m::self())
            ->shouldReceive('orderBy')
            ->andReturn(m::self())
            ->shouldReceive('getQuery')
            ->andReturn(m::self())
            ->shouldReceive('getResult')
            ->andReturn(m::self())
            ->mock();

        $emMock = m::mock('Doctrine\ORM\EntityManager')
            ->shouldReceive('createQueryBuilder')
            ->andReturn($qb)
            ->mock();


        $classMetaMock = m::mock('Doctrine\ORM\Mapping\ClassMetadata');
        $repo = new ActivityRepository($emMock, $classMetaMock);

        $repo->getActivities(1);
    }
}