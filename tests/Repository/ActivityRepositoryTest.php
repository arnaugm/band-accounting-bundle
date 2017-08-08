<?php

namespace Tests\ArnauGM\BandAccountingBundle\Repository;

use Mockery as m;
use PHPUnit\Framework\TestCase;
use ArnauGM\BandAccountingBundle\Repository\ActivityRepository;

class ActivityRepositoryTest extends TestCase
{
    /**
     * {@inheritDoc}
     */
    protected function tearDown()
    {
        m::close();
    }

    public function testGetAllActivities()
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

    public function testGetActivitiesSinceDate()
    {
        $qb = m::mock('Doctrine\ORM\QueryBuilder')
            ->shouldReceive('select')
            ->andReturn(m::self())
            ->shouldReceive('from')
            ->andReturn(m::self())
            ->shouldReceive('where')->with("a.dateValue >= '2017-04-01'")
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

        $repo->getActivities('2017-04-01');
    }

}