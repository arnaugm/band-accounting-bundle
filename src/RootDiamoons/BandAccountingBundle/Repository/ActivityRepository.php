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
    public function getActivities($sinceDate = null)
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a');

        if (!is_null($sinceDate)) {
            $qb = $qb
                ->where('a.dateValue >= '.$sinceDate);
        }

        $qb = $qb
            ->orderBy('a.dateValue', 'DESC')
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);

        return $qb;
    }
}
