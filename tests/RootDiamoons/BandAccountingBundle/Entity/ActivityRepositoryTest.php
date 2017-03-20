<?php

namespace Tests\RootDiamoons\BandAccountingBundle\Entity;

use Doctrine\ORM\QueryBuilder;
use RootDiamoons\BandAccountingBundle\Entity\ActivityRepository;
use PHPUnit\Framework\TestCase;
use Mockery as m;

class ActivityRepositoryTest extends TestCase
{
    public function tearDown() {
        m::close();
    }

    public function testGetActivities()
    {
        $emMock = m::mock('\Doctrine\ORM\EntityManager')
            ->shouldReceive('createQueryBuilder')
            ->andReturn(m::self())
            ->mock()
            ->shouldReceive('select')
            ->andReturn(m::self())
            ->mock()
            ->shouldReceive('from')
            ->andReturn(m::self())
            ->mock()
            ->shouldReceive('orderBy')
            ->andReturn(m::self())
            ->mock()
            ->shouldReceive('getQuery')
            ->andReturn(m::self())
            ->mock()
            ->shouldReceive('getResult')
            ->andReturn(m::self())
            ->mock();
        $classMetaMock = m::mock('\Doctrine\ORM\Mapping\ClassMetadata');
        $repo = new ActivityRepository($emMock, $classMetaMock);

        $qb = $repo->getActivities();

        $this->assertInstanceOf(QueryBuilder::class, $qb);
    }
}