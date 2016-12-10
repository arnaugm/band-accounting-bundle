<?php

namespace RootDiamoons\BandAccountingBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * ActivityRepository
 *
 */
class ActivityRepository extends EntityRepository
{
    public function getActivities()
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a')
//            ->setMaxResults(10)
            ->orderBy('a.dateValue', 'DESC')
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);

        return $qb;
    }
}
