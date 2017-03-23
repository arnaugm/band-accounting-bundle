<?php

namespace RootDiamoons\BandAccountingBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * ActivityRepository
 *
 */
class ActivityRepository extends EntityRepository
{
    public function getActivities($filter = null)
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a');

        if (!is_null($filter)) {
            $qb
                ->where('a.dateValue > 2');
        }

        $qb
            ->orderBy('a.dateValue', 'DESC')
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);

        return $qb;
    }
}
